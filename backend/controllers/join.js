import { Router } from "express";
import { userService } from "../services";

const joinRouter = Router();

joinRouter.post("/", async (req, res, next) => {
  try {
    const userInfo = req.body;
    await userService.createUser(userInfo);

    res.status(201).end();
    next();
  } catch (error) {
    next(error);
  }
});

export { joinRouter };
