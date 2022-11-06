import fetch from "node-fetch";
import qs from "qs";
import { userModel } from "../db/models";
import JWT from "../utils/token";

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

  async authKakao(code) {
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
    const data = await response.json();
    const query = encodeURI(data.access_token);

    return query;
  }

  async authKakaoJoin(code) {
    const tokenInfo = await this.authKakaoTokenInfo(code);
    const userInfo = await this.authKakaoUserInfo(tokenInfo);
  }

  async authKakaoTokenInfo(code) {
    const response = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      body: qs.stringify({
        grant_type: "authorization_code",
        client_id: `${process.env.KAKAO_CLIENT_ID}`,
        client_secret: `${process.env.KAKAO_CLIENT_SECRET}`,
        redirect_uri: `${process.env.KAKAO_JOIN_REDIRECT_URI}`,
        code
      })
    });
    const tokenInfo = await response.json();

    return tokenInfo;
  }

  async authKakaoUserInfo(tokenInfo) {
    const { access_token } = tokenInfo;

    const response = await fetch("https://kapi.kakao.com/v2/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      }
    });
    const userInfo = await response.json();

    return userInfo;
  }
}

const authService = new AuthService();

export { authService };
