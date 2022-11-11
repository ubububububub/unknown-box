import JWT from "../utils/token";

const checkTokens = (req, res, next) => {
  authAccessToken();

  function authAccessToken() {
    const accessToken = req.headers["x-access-token"];

    if (!accessToken) {
      next("AccessToken이 일치하지 않습니다.");
    }

    if (JWT.verifyToken(accessToken) === "TokenExpiredError") {
      next("TokenExpiredError");
    }

    next();
  }
};

export { checkTokens };
