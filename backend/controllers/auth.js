import { Router } from "express";
import { authService } from "../services";
import JWT from "../utils/token";

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
    const { email, role } = await authService.authKakaoJoin(code);

    res.redirect(`/login/kakao/callback?email=${email}&role=${role}`);
  } catch (error) {
    next(error);
  }
});

authRouter.post("/kakao/tokens", async (req, res, next) => {
  const { email } = req.body;

  try {
    const { newAccessToken, newRefreshToken } = await JWT.createTokens(email);

    res.status(201).json({ newAccessToken, newRefreshToken });
  } catch (error) {
    next(error);
  }
});

export { authRouter };
