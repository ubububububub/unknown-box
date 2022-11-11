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

  async setRefreshToken(email, refreshToken) {
    await this.model.updateOne({ email }, { refreshToken });
  }

  async getRefreshTokenByEmail(email) {
    const user = await this.model.findOne({ email });
    return user;
  }

  async getOne(email) {
    const user = await this.model.find({ email });
    return user;
  }
  async changePassword(email, password) {
    const result = await this.model.updateOne({ email }, { password });
    return result;
  }
  async modify(email, userInfo) {
    await this.model.updateOne({ email }, userInfo);
  }
}

const userModel = new UserModel(model);

export { userModel };
