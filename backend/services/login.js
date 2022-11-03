import { userModel } from "../db/models";
import { hashPassword } from "../utils/hash-password";
import JWT from "../utils/token";

class LoginService {
  constructor(model) {
    this.model = model;
  }

  async login(loginInfo) {
    const { email, password } = loginInfo;
    const user = await userModel.getByEmail(email);

    return this.auth(user, password);
  }

  auth(user, password) {
    this.authEmail(user);

    const { email, role } = user;

    this.authPassword(user, password);

    return this.createTokens(email, role);
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

  async createTokens(email, role) {
    const newAccessToken = this.createAccessToken(email);
    const newRefreshToken = await this.createRefreshToken(email);

    return { newAccessToken, newRefreshToken, role };
  }

  createAccessToken(email) {
    return JWT.createToken(
      { email },
      {
        expiresIn: "1h",
        issuer: "projectName"
      }
    );
  }

  async createRefreshToken(email) {
    const refreshToken = JWT.createToken(
      { email },
      {
        expiresIn: "14d",
        issuer: "projectName"
      }
    );

    await userModel.setRefreshToken(email, refreshToken);

    return refreshToken;
  }
}

const loginService = new LoginService(userModel);

export { loginService };
