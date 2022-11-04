import mongoose from "mongoose";
import { userSchema } from "../schemas";

const model = mongoose.model("User", userSchema);

class UserModel {
  constructor(model) {
    this.model = model;
  }

  async create(userInfo) {
    const newUser = await this.model.create(userInfo);
    return newUser;
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
}

const userModel = new UserModel(model);

export { userModel };
