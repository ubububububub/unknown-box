import mongoose from "mongoose";
import { userSchema } from "../schemas";
import { hashPassword } from "../../utils/hash-password";

const model = mongoose.model("User", userSchema);

class UserModel {
  constructor(model) {
    this.model = model;
  }

  async create(userInfo) {
    await this.model.create(userInfo);
  }

  async getAll() {
    const users = await this.model.find({});
    return users;
  }
}

const userModel = new UserModel(model);

userModel.create({
  email: process.env.ADMIN,
  password: hashPassword(process.env.ADMIN),
  name: process.env.ADMIN,
  address: process.env.ADMIN,
  phone: process.env.ADMIN,
});

export { userModel };
