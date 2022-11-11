import { userModel } from "../db/models/user";
import JWT from "../utils/token";

const adminCheck = async (req, res, next) => {
  try {
    const accessToken = req.headers["x-access-token"];
    const token = JWT.decodeToken(accessToken);
    const user = await userModel.getByEmail(token.email);
    if (user.role !== "admin") throw new Error("접근권한이 없습니다.");
    next();
  } catch (err) {
    next(err);
  }
};

export { adminCheck };
