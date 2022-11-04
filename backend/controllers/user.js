import { Router } from "express";
import { userService } from "../services";

const userController = Router();

userController.get("/", async (req, res, next) => {
  try {
    const user = await userService.getThisUser(req.cookies);
    return user;
  } catch (err) {
    next(err);
  }
});
userController.put("/", async (req, res, next) => {
  try {
    const user = await userService.changePassword(req.cookies, req.body);
    return user;
  } catch (err) {
    next(err);
  }
});

export { userController };
