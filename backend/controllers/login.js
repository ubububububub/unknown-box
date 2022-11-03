import { Router } from "express";
import { loginService } from "../services";

const loginRouter = Router();

loginRouter.post("/", async (req, res, next) => {
  try {
    const loginInfo = req.body;
    const token = req.cookies;
    const { newAccessToken, newRefreshToken } = await loginService.login(
      loginInfo,
      token
    );
    res.cookie("accessToken", newAccessToken);
    res.cookie("refreshToken", newRefreshToken);
    res.status(200).json({ message: "login success" });
  } catch (error) {
    next(error);
  }
});

export { loginRouter };
