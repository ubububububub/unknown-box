import { userModel } from "../db/models";
import { loginService } from "../services";
import JWT from "../utils/token";

const checkTokens = (req, res, next) => {
  const { email } = req.body;
  const token = req.cookies;

  authToken(email, token);

  function authToken(email, token) {
    validateTokens(token);
    validateExpirationTokens(token);
    authAccessToken(email, token);
    authRefreshToken(email, token);

    next();
  }

  function validateTokens(token) {
    const { accessToken, refreshToken } = token;
    if (JWT.verifyToken(accessToken) && JWT.verifyToken(refreshToken)) {
      const { newAccessToken, newRefreshToken } =
        loginService.createTokens(email);

      res.cookie("accessToken", newAccessToken);
      res.cookie("refreshToken", newRefreshToken);
    }
  }

  function validateExpirationTokens(token) {
    const { accessToken, refreshToken } = token;

    if (!JWT.verifyToken(accessToken) && !JWT.verifyToken(refreshToken)) {
      next("API 사용 권한이 없습니다.");
    }
  }

  async function authAccessToken(email, token) {
    const { accessToken, refreshToken } = token;

    if (!JWT.verifyToken(accessToken)) {
      const user = await userModel.getRefreshTokenByEmail(email);

      if (user.refreshToken !== refreshToken) {
        next("refresh 토큰이 일치하지 않습니다.");
      }

      const newAccessToken = loginService.createAccessToken(email);

      res.cookie("accessToken", newAccessToken);
    }
  }

  async function authRefreshToken(email, token) {
    const { refreshToken } = token;

    if (!JWT.verifyToken(refreshToken)) {
      const expirationDecoded = JWT.decodeToken(refreshToken);

      const user = await userModel.getByEmail(email);
      const decoded = JWT.decodeToken(user.refreshToken);

      if (expirationDecoded.email === decoded.email) {
        const newFreshToken = loginService.createRefreshToken(email);

        res.cookie("refreshToken", newFreshToken);
      }
    }
  }
};

export { checkTokens };
