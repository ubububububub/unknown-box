import { Router } from "express";
import { joinRouter } from "./join";
import { membersRouter } from "./members";
import { loginRouter } from "./login";
import { authRouter } from "./auth";
import { checkTokens } from "../middlewares";
import { adminController } from "./admin";
import { productController } from "./product";
import { categoryController } from "./category";
import { adminCheck } from "../middlewares/adminCheck";
import { orderController } from "./order";
import { userController } from "./user";
import { randomboxController } from "./randombox";

const router = Router();

router.use("/join", joinRouter);
router.use("/members", checkTokens, membersRouter);
router.use("/login", loginRouter);
router.use("/auth", authRouter);
router.use("/product", productController);
router.use("/admin", checkTokens, adminCheck, adminController);
router.use("/category", categoryController);
router.use("/order", checkTokens, orderController);
router.use("/user", checkTokens, userController);
router.use("/randombox", randomboxController);

export { router };
