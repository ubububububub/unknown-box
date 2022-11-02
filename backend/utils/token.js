import "dotenv/config";
import jwt from "jsonwebtoken";

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
}

export default JWT;
