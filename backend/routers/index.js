import { Router } from "express";
import { joinRouter } from "./join-router";
import { membersRouter } from "./members-router";

const router = Router();

router.use("/join", joinRouter);
router.use("/members", membersRouter);

export { router };
