import { Router } from "express";
import { randomboxService } from "../services";
import { checkTokens } from "../middlewares";

const randomboxController = Router();

randomboxController.get("/:randomboxId", async (req, res, next) => {
  try {
    const randombox = await randomboxService.getRandombox(req.params);
    res.status(200).json(randombox);
  } catch (err) {
    next(err);
  }
});
randomboxController.put(
  "/:randomboxId",
  checkTokens,
  async (req, res, next) => {
    try {
      await randomboxService.openRandombox(
        req.params,
        req.body,
        req.headers["x-access-token"]
      );
      res.status(200).end();
    } catch (err) {
      next(err);
    }
  }
);

export { randomboxController };
