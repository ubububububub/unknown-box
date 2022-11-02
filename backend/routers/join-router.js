import { Router } from "express";
import { userController } from "../controllers";

const joinRouter = Router();

joinRouter.post("/", userController.createUser);

export { joinRouter };
