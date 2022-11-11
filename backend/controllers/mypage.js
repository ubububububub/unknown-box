import { Router } from "express";
import { userService } from "../services";

const mypageController = Router();

mypageController.get("/", async (req, res, next) => {
  try {
    const mypage = await userService.getInMyPage(req.headers["x-access-token"]);
    res.status(200).json(mypage);
  } catch (err) {
    next(err);
  }
});
mypageController.put("/", async (req, res, next) => {
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

export { mypageController };
