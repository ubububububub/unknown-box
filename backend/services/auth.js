import fetch from "node-fetch";
import qs from "qs";
import crypto from "crypto";
import { userModel } from "../db/models";
import JWT from "../utils/token";
import { mail } from "../utils/mail";

const IV_LENGTH = 16;

class AuthService {
  async auth(accessToken, refreshToken) {
    if (JWT.verifyToken(refreshToken) === "TokenExpiredError") {
      throw new Error("API 사용 권한이 없습니다.");
    }

    const { email } = JWT.decodeToken(accessToken);
    const user = await userModel.getByEmail(email);

    if (!user) {
      throw new Error("AccessToken이 일치하지 않습니다.");
    }

    const newTokens = await JWT.createTokens(email);

    return { ...newTokens };
  }

  async authKakaoJoin(code) {
    const tokenInfo = await this.authKakao(code);
    const { access_token, refresh_token } = tokenInfo;
    const email = await this.authKakaoUserInfo(access_token);

    const data = await userModel.getByEmail(email);

    if (!data) {
      await userModel.create({
        email,
        refreshToken: refresh_token
      });
    }

    return encodeURIComponent(email);
  }

  async authKakao(code) {
    try {
      const response = await fetch("https://kauth.kakao.com/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        body: qs.stringify({
          grant_type: "authorization_code",
          client_id: `${process.env.KAKAO_CLIENT_ID}`,
          client_secret: `${process.env.KAKAO_CLIENT_SECRET}`,
          redirect_uri: `${process.env.KAKAO_LOGIN_REDIRECT_URI}`,
          code
        })
      });
      const tokenInfo = await response.json();

      return tokenInfo;
    } catch (error) {
      throw new Error(error);
    }
  }

  async authKakaoUserInfo(accessToken) {
    try {
      const response = await fetch("https://kapi.kakao.com/v2/user/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          Authorization: `Bearer ${accessToken}`
        }
      });
      const { kakao_account } = await response.json();
      const { email } = kakao_account;

      return email;
    } catch (error) {
      throw new Error(error);
    }
  }

  async authCreateMailNum(email) {
    try {
      const isDuplicationExist = await this.authMailExist(email);

      if (isDuplicationExist) {
        return true;
      }

      const authNum = this.authMailNumCipher(email);
      this.authCreateMail(email, authNum);
      return false;
    } catch (error) {
      throw new Error(error);
    }
  }

  async authMailExist(email) {
    try {
      const user = await userModel.getByEmail(email);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  authMailNumCipher(email) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(process.env.MAIL_KEY),
      iv
    );
    const encrypted = cipher.update(email);
    const encryptResult = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encryptResult.toString("hex");
  }

  async authMailNum(email, mailNum) {
    const decodeMailNum = this.authMailNumDecipher(mailNum);

    return email === decodeMailNum;
  }

  authMailNumDecipher(mailNum) {
    const textParts = mailNum.split(":");
    const iv = Buffer.from(textParts.shift(), "hex");
    const encryptedText = Buffer.from(textParts.join(":"), "hex");
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(process.env.MAIL_KEY),
      iv
    );
    const decrypted = decipher.update(encryptedText);

    const decryptResult = Buffer.concat([decrypted, decipher.final()]);

    return decryptResult.toString();
  }

  async authCreateMail(email, authNum) {
    mail.setMessage(email, `인증번호는 ${authNum} 입니다.`);
    mail.sendMail();
  }
}

const authService = new AuthService();

export { authService };
