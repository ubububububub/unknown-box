import mongoose from "mongoose";
import { userSchema } from "../schemas";

const model = mongoose.model("users", userSchema);

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

  async getByEmail(email) {
    const user = await this.model.findOne({ email });
    return user;
  }

  async getRefreshTokenByEmail(email) {
    const user = await this.model.findOne({ email });
    return user;
  }

  async modify(email, userInfo) {
    const result = await this.model.updateOne({ email }, userInfo);
    return result;
  }
}

const userModel = new UserModel(model);

export { userModel };
