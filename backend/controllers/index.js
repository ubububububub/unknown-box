import { Router } from "express";
import { joinRouter } from "./join";
import { membersRouter } from "./members";
import { loginRouter } from "./login";
import { checkTokens } from "../middlewares";
import { adminController } from "./admin";
import { productController } from "./product";
import { categoryController } from "./category";

const router = Router();

router.use("/join", joinRouter);
router.use("/members", checkTokens, membersRouter);
router.use("/login", loginRouter);
router.use("/product", productController);
router.use("/admin", checkTokens, adminController);
router.use("/category", categoryController);

export { router };
