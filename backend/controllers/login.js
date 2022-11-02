import { Router } from "express";
import { loginService } from "../services";

const loginRouter = Router();

loginRouter.get("/", async (req, res, next) => {
  try {
    const loginInfo = req.body;
    const token = req.cookies;

    const validateToken = await loginService.login(loginInfo, token);

    res.cookie("accessToken", validateToken.accessToken);
    res.cookie("refreshToken", validateToken.refreshToken);
    res.send();
  } catch (error) {
    next(error);
  }
});

export { loginRouter };
