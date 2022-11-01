import { Router } from "express";
import { joinRouter } from "./join-controller";
import { membersRouter } from "./members-controller";

const router = Router();

router.use("/join", joinRouter);
router.use("/members", membersRouter);

export { router };
