import "dotenv/config";
import jwt from "jsonwebtoken";

const createToken = (data, option) => {
  if (!option) {
    return jwt.sign(data, process.env.JWT_SECRET);
  }

  return jwt.sign(data, process.env.JWT_SECRET, option);
};

// const verifyToken = ()

export { createToken };
