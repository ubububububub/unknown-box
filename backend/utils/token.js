import "dotenv/config";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

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
      return null;
    }
  }

  static decodeToken(token) {
    return jwt_decode(token);
  }
}

export default JWT;
