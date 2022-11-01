import { Router } from "express";
import { userService } from "../services";

const joinRouter = Router();

joinRouter.post("/", userService.createUser);

export { joinRouter };
