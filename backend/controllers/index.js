import { Router } from "express";
import { joinRouter } from "./join";
import { membersRouter } from "./members";

const router = Router();

router.use("/join", joinRouter);
router.use("/members", membersRouter);

export { router };
