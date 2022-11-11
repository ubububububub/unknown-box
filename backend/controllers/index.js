import { Router } from "express";
import { joinRouter } from "./join";
import { loginRouter } from "./login";
import { authRouter } from "./auth";
import { mainController } from "./main";
import { categoryController } from "./category";
import { orderController } from "./order";
import { mypageController } from "./mypage";
import { randomboxController } from "./randombox";
import { qnaboardController } from "./qnaboard";
import { adminController } from "./admin";
import { checkTokens, adminCheck } from "../middlewares";

const router = Router();

router.use("/join", joinRouter);
router.use("/login", loginRouter);
router.use("/auth", authRouter);
router.use("/main", mainController);
router.use("/category", categoryController);
router.use("/order", checkTokens, orderController);
router.use("/mypage", checkTokens, mypageController);
router.use("/randombox", randomboxController);
router.use("/qnaboard", qnaboardController);
router.use("/admin", checkTokens, adminCheck, adminController);

export { router };
