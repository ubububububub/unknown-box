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
}

const authService = new AuthService();

export { authService };
