import { userModel } from "../db/models";
import { hashPassword } from "../utils/hash-password";

class UserService {
  constructor(model) {
    this.model = model;
  }

  async createUser(userInfo) {
    const { email, password } = userInfo;
    const user = await this.model.getByEmail(email);

    if (user) {
      throw new Error("이미 가입된 이메일입니다.");
    }

    const newUser = await this.model.create({
      ...userInfo,
      password: hashPassword(password),
    });

    return newUser;
  }

  async getUsers() {
    const users = await this.model.getAll();
    return users;
  }
}

const userService = new UserService(userModel);

export { userService };
