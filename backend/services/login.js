import { userModel } from "../db/models";
import { hashPassword } from "../utils/hash-password";
import { createToken } from "../utils/token";

class LoginService {
  constructor(model) {
    this.model = model;
  }

  async login(loginInfo, token) {
    const { email, password } = loginInfo;
    const user = await this.model.getByEmail(email);

    return this.auth(user, password, token);
  }

  auth(user, password, token) {
    this.authEmail(user);
    this.authPassword(user, password);

    return this.authToken(user, token);
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

  authToken(user, token) {
    if (!token.accessToken && !token.refreshToken) {
      return createTokens(user);
    }

    // const accessToken = this.authAccessToken(user, token.accessToken);
    // const refreshToken = this.authAccessToken(user, token.refreshToken);
    const accessToken = "1";
    const refreshToken = "2";
    return { accessToken, refreshToken };
  }

  async createTokens(user) {
    const { email } = user;
    const accessToken = createToken(
      { email },
      {
        expiresIn: "1h",
        issuer: "projectName",
      },
    );
    const refreshToken = createToken(
      { email },
      {
        expiresIn: "14d",
        issuer: "projectName",
      },
    );

    await this.model.setRefreshToken(email, refreshToken);

    return { accessToken, refreshToken };
  }

  async authAccessToken(user, accessToken) {
    console.log(accessToken);
    // if () {
    //   // accessToken만 만료된 경우
    //   // db에 저장되어있는 refreshToken과 쿠키로 보낸 refresh 토큰이 일치한지 확인한다.
    //   // 일치하면 새로운 accessToken을 발급해서 cookie로 보내준다.
    //   // 일치하지 않으면 오류를 띄운다.
    //   const user = await this.model.getByRefreshToken(refreshToken);
    //   if (refreshToken !== user.refreshToken) {
    //     throw new Error("refresh 토큰이 일치하지 않습니다.");
    //   }
    //   const accessToken = createToken(
    //     { email: user.email },
    //     {
    //       expiresIn: "1h",
    //       issuer: "projectName",
    //     },
    //   );
    //   return accessToken;
    // }
    // return this.authRefreshToken(user, token.refreshToken);
  }

  async authRefreshToken(refreshToken) {
    // if (!refreshToken) {
    //   // accessToken, refreshToken이 모두 만료된 경우
    //   throw new Error(
    //     "access토큰과, refresh토큰이 모두 만료되었습니다. 다시 로그인 해주십시오.",
    //   );
    // }
  }
}

const loginService = new LoginService(userModel);

export { loginService };
