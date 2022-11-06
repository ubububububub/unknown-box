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

authRouter.get("/kakao/callback", async (req, res, next) => {
  const { code } = req.query;

  try {
    const query = await authService.authKakao(code);
    res.redirect("/?access_token=" + query);
  } catch (error) {
    next(error);
  }
});

authRouter.get("/kakao/join/callback", async (req, res, next) => {
  const { code } = req.query;

  await authService.authKakaoJoin(code);
});

export { authRouter };
