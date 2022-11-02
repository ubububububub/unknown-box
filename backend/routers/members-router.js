import { Router } from "express";
import { userController } from "../controllers";

const membersRouter = Router();

membersRouter.get("/", userController.getUsers);

export { membersRouter };
