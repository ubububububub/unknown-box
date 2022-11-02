import { userModel } from "../db/models";

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async createUser(email) {
    const newUser = await userModel.create(email);
    return newUser;
  }

  async getUsers() {
    const users = await userModel.getAll();
    return users;
  }

  async getUserByEmail(email) {
    const user = await userModel.getByEmail(email);
    return user;
  }
}

const userService = new UserService(userModel);

export { userService };
