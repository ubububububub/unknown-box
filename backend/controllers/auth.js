import { Router } from "express";
import { authService } from "../services";

const authRouter = Router();

authRouter.post("/", async (req, res, next) => {
  const accessToken = req.headers["x-access-token"];
  const refreshToken = req.headers["x-refresh-token"];

  try {
    const { newAccessToken, newRefreshToken } = await authService.auth(
      accessToken,
      refreshToken
    );

    res.status(200).json({
      newAccessToken,
      newRefreshToken
    });
  } catch (error) {
    next(error);
  }
});

export { authRouter };
