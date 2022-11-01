import { Router } from "express";
import { userService } from "../services";

const membersRouter = Router();

membersRouter.get("/", userService.getUsers);

export { membersRouter };
