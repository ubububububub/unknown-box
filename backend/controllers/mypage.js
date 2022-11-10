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

export { mypageController };
