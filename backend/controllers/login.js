import { Router } from "express";
import { loginService } from "../services";

const loginRouter = Router();

loginRouter.post("/", async (req, res, next) => {
  try {
    const loginInfo = req.body;
    const token = req.cookies;

<<<<<<< HEAD
    const { accessToken, refreshToken } = await loginService.login(
=======
    const { newAccessToken, newRefreshToken } = await loginService.login(
>>>>>>> feat/login-login
      loginInfo,
      token,
    );

<<<<<<< HEAD
    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);

    res.status(200).send();
=======
    res.cookie("accessToken", newAccessToken);
    res.cookie("refreshToken", newRefreshToken);
    next();
>>>>>>> feat/login-login
  } catch (error) {
    next(error);
  }
});

export { loginRouter };
