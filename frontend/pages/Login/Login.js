import LoginForm from "../../components/LoginForm/LoginForm.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";

export class Login extends Component {
  template() {
    return `<div id="contaniner"></div>`;
  }

  mounted() {
    new LoginForm(qs("#contaniner"));
  }
}
