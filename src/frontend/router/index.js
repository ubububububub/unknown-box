import { Hello } from "../pages/Hello.js";
import { Second } from "../pages/Second.js";
import { Main } from "../pages/Main.js";

const routes = [
  { path: "/", view: Main },
  { path: "/second", view: Second },
  { path: "/hello", view: Hello },
  { path: "/404", view: Hello },
];

export default routes;
