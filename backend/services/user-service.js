import { userModel } from "../db/models";

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async createUser(req, res, next) {
    const userInfo = req.body;
    const { email } = userInfo;

    try {
      const user = await userModel.getByEmail(email);

      if (user) {
        throw new Error("이미 가입된 이메일입니다.");
      }

      // this.userModel 안됨
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
