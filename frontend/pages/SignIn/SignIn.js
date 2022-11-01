<<<<<<< HEAD
import SignInForm from "../../components/SignInForm/SignInForm.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";

export class SignIn extends Component {
  template() {
    return `<div id="container"></div>`;
  }

  mounted() {
    new SignInForm(qs("#container"));
=======
import Component from "../../core/Component.js";

export class SignIn extends Component {
  template() {
    return `<div>회원가입 페이지입니다.</div>`;
>>>>>>> feat/join-join
  }
}
