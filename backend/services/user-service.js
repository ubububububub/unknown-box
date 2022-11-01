import { userModel } from "../db/models";

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async createUser(req, res, next) {
    const userInfo = req.body;

    try {
      await userModel.create(userInfo);
      res.status(201).json({ message: "success" });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userModel.getAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
}

const userService = new UserService(userModel);

export { userService };
