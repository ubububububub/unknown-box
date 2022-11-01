import { userService } from "../services";

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async createUser(req, res, next) {
    try {
      const userInfo = req.body;
      const { email } = userInfo;

      const user = await userService.getUserByEmail(email);

      if (user) {
        throw new Error("이미 가입된 이메일입니다.");
      }

      const newUser = await userService.createUser(userInfo);

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
}

const userController = new UserController(userService);

export { userController };
