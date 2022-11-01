import mongoose from "mongoose";
import userSchema from "../schemas";
import { hashPassword } from "../../utils/hash-password";

const model = mongoose.model("User", userSchema);

class UserModel {
  constructor(model) {
    this.model = model;
  }

  async create({ email, password, name, address, phone }) {
    await this.model.create({
      email,
      password,
      name,
      address,
      phone,
    });
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
