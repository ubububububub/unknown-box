import { Router } from "express";
import { loginService } from "../services";

const loginRouter = Router();

loginRouter.post("/", async (req, res, next) => {
  try {
    const loginInfo = req.body;
    const token = req.cookies;

    const { accessToken, refreshToken } = await loginService.login(
      loginInfo,
      token,
    );

    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);

    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

export { loginRouter };
