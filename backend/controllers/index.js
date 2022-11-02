import { Router } from "express";
import { joinRouter } from "./join";
import { membersRouter } from "./members";
import { loginRouter } from "./login";

const router = Router();

router.use("/join", joinRouter);
router.use("/members", membersRouter);
router.use("/login", loginRouter);

export { router };
