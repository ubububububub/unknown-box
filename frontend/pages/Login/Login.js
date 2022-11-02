<<<<<<< HEAD
import LoginForm from "../../components/LoginForm/LoginForm.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";

export class Login extends Component {
  template() {
    return `<div id="contaniner">
    </div>`;
  }
  mounted() {
    new LoginForm(qs("#contaniner"));
=======
import Component from "../../core/Component.js";

export class Login extends Component {
  template() {
    return `<div>로그인 페이지입니다.</div>`;
>>>>>>> feat/join-join
  }
}
