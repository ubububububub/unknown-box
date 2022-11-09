import { Admin } from "../pages/Admin/Admin.js";
import { AdminProduct } from "../pages/AdminProduct/AdminProduct.js";
import { AdminOrder } from "../pages/AdminOrder/AdminOrder.js";
import { Cart } from "../pages/Cart/Cart.js";
import { Detail } from "../pages/Detail/Detail.js";
import { Login } from "../pages/Login/Login.js";
import { KakaoCallback } from "../pages/KakaoCallback/KakaoCallback.js";
import { Main } from "../pages/Main/Main.js";
import { MyOrder } from "../pages/MyOrder/MyOrder.js";
import { MyOrderEdit } from "../pages/MyOrderEdit/MyOrderEdit.js";
import { MyPage } from "../pages/MyPage/MyPage.js";
import { NotFound } from "../pages/NotFound/NotFound.js";
import { Payment } from "../pages/Payment/Payment.js";
import { Recipt } from "../pages/Recipt/Recipt.js";
import { SignIn } from "../pages/SignIn/SignIn.js";
import { RandomBox } from "../pages/RandomBox/RandomBox.js";
import { QnaBoard } from "../pages/QnaBoard/QnaBoard.js";

const routes = [
  { path: "/", view: Main },
  { path: "/signin", view: SignIn },
  { path: "/login", view: Login },
  { path: "/login/kakao/callback", view: KakaoCallback },
  { path: "/mypage", view: MyPage },
  { path: "/mypage/order", view: MyOrder },
  { path: "/mypage/order/:id", view: MyOrderEdit },
  { path: "/detail/:id", view: Detail },
  { path: "/cart", view: Cart },
  { path: "/order/payment", view: Payment },
  { path: "/order/recipt", view: Recipt },
  { path: "/admin", view: Admin },
  { path: "/admin/products", view: AdminProduct },
  { path: "/admin/order", view: AdminOrder },
  { path: "/qnaboard", view: QnaBoard },
  { path: "/randombox/:id", view: RandomBox },
  { path: "/404", view: NotFound }
];

export default routes;
