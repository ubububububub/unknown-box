import { Router } from "express";
import { userService } from "../services";

const userController = Router();

userController.get("/", async (req, res, next) => {
  try {
    const user = await userService.getThisUser(req.headers["x-access-token"]);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});
userController.put("/", async (req, res, next) => {
  try {
    const result = await userService.changePassword(
      req.headers["x-access-token"],
      req.body
    );
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export { userController };
