import { userModel } from "../db/models";

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async createUser(userInfo) {
    const { email } = userInfo;
    const user = await userModel.getByEmail(email);

    if (user) {
      throw new Error("이미 가입된 이메일입니다.");
    }

    const newUser = await userModel.create(userInfo);

    return newUser;
  }

  async getUsers() {
    const users = await userModel.getAll();
    return users;
  }
}

const userService = new UserService(userModel);

export { userService };
