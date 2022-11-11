import "dotenv/config";
import jwt from "jsonwebtoken";
import { userModel } from "../db/models";

class JWT {
  static createToken(data, option) {
    if (!option) {
      return jwt.sign(data, process.env.JWT_SECRET);
    }

    return jwt.sign(data, process.env.JWT_SECRET, option);
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return "TokenExpiredError";
      }
    }
  }

  static decodeToken(token) {
    return jwt.decode(token);
  }

  static async createTokens(email) {
    const newAccessToken = this.createAccessToken(email);
    const newRefreshToken = await this.createRefreshToken(email);

    return { newAccessToken, newRefreshToken };
  }

  static createAccessToken(email) {
    return JWT.createToken(
      { email },
      {
        expiresIn: "1h",
        issuer: "projectName"
      }
    );
  }

  static async createRefreshToken(email) {
    const refreshToken = JWT.createToken(
      { email },
      {
        expiresIn: "7d",
        issuer: "projectName"
      }
    );

    await userModel.modify(email, { refreshToken });

    return refreshToken;
  }
}

export default JWT;
