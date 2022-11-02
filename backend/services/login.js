import { userModel } from "../db/models";
import { hashPassword } from "../utils/hash-password";
import JWT from "../utils/token";

class LoginService {
  constructor(model) {
    this.model = model;
  }

  async login(loginInfo, token) {
    const { email, password } = loginInfo;
    const user = await userModel.getByEmail(email);
    const newToken = this.auth(user, password, token);

    return newToken;
  }

  auth(user, password, token) {
    this.authEmail(user);

    const { email } = user;

    this.authPassword(user, password);

    const newToken = this.authToken(email, token);

    return newToken;
  }

  authEmail(user) {
    if (!user) {
      throw new Error("가입되지 않은 이메일입니다.");
    }
  }

  authPassword(user, password) {
    if (user.password !== hashPassword(password)) {
      throw new Error("가입된 회원 아이디가 아니거나 비밀번호가 틀립니다.");
    }
  }

  async authToken(email, token) {
    if (!token.accessToken && !token.refreshToken) {
      return this.createTokens(email);
    }

    if (
      JWT.verifyToken(token.accessToken) &&
      JWT.verifyToken(token.refreshToken)
    ) {
      const { accessToken, refreshToken } = token;
      // accessToken, refreshToken 토큰 둘다 유효한 경우 코드를 어떻게 이어가야 할까요?
      return {
        accessToken,
        refreshToken,
      };
    }

    const accessToken = await this.authAccessToken(email, token);
    const refreshToken = await this.authRefreshToken(email, token);

    if (!accessToken && !refreshToken) {
      throw new Error("API 사용 권한이 없습니다.");
    }

    return { accessToken, refreshToken };
  }

  async createTokens(email) {
    const accessToken = this.createAccessToken(email);
    const refreshToken = await this.createRefreshToken(email);

    return { accessToken, refreshToken };
  }

  createAccessToken(email) {
    return JWT.createToken(
      { email },
      {
        expiresIn: "1h",
        issuer: "projectName",
      },
    );
  }

  async createRefreshToken(email) {
    const refreshToken = JWT.createToken(
      { email },
      {
        expiresIn: "14d",
        issuer: "projectName",
      },
    );

    await userModel.setRefreshToken(email, refreshToken);

    return refreshToken;
  }

  async authAccessToken(email, token) {
    const { accessToken, refreshToken } = token;

    if (!JWT.verifyToken(accessToken)) {
      const user = await userModel.getRefreshTokenByEmail(email);

      if (user.refreshToken !== refreshToken) {
        throw new Error("refresh 토큰이 일치하지 않습니다.");
      }

      return this.createAccessToken(email);
    }

    return accessToken;
  }

  async authRefreshToken(email, token) {
    const { refreshToken } = token;

    if (!JWT.verifyToken(refreshToken)) {
      return this.createRefreshToken(email);
    }

    return refreshToken;
  }
}

const loginService = new LoginService(userModel);

export { loginService };
