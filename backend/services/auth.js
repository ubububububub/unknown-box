import fetch from "node-fetch";
import qs from "qs";
import { userModel } from "../db/models";
import JWT from "../utils/token";
import { randomNum } from "../utils/random";
import { mail } from "../utils/mail";
import { redisCli } from "../app";

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

    return { email, role: data.role };
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

      const authNum = randomNum();
      await redisCli.set(email, authNum);
      await redisCli.expire(email, 300);
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

  async authMailNum(email, mailNum) {
    const user = await redisCli.get(email);

    return user === mailNum;
  }

  async authCreateMail(email, authNum) {
    mail.setMessage(
      email,
      `인증번호는 ${authNum} 입니다. 5분 내로 입력해주세요.`
    );
    mail.sendMail();
  }
}

const authService = new AuthService();

export { authService };
