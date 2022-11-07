import { userModel } from "../db/models";
import { hashPassword } from "../utils/hash-password";
import JWT from "../utils/token";

class LoginService {
  async login(loginInfo) {
    const { email, password } = loginInfo;
    const user = await userModel.getByEmail(email);

    return this.auth(user, password);
  }

  async auth(user, password) {
    this.authEmail(user);
    const { email, role } = user;
    this.authPassword(user, password);

    return { ...(await JWT.createTokens(email)), role };
  }

  authEmail(user) {
    if (!user) {
      throw new Error("가입된 회원 아이디가 아니거나 비밀번호가 틀립니다.");
    }
  }

  authPassword(user, password) {
    if (user.password !== hashPassword(password)) {
      throw new Error("가입된 회원 아이디가 아니거나 비밀번호가 틀립니다.");
    }
  }
}

const loginService = new LoginService();

export { loginService };
