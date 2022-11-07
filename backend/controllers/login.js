import { Router } from "express";
import { loginService } from "../services";

const loginRouter = Router();

loginRouter.post("/", async (req, res, next) => {
  try {
    const loginInfo = req.body;
    const { newAccessToken, newRefreshToken, role } = await loginService.login(
      loginInfo
    );

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      role
    });
  } catch (error) {
    next(error);
  }
});

export { loginRouter };
