import SignInForm from "../../components/SignInForm/SignInForm.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";

export class SignIn extends Component {
  template() {
    return `<div id="container"></div>`;
  }

  mounted() {
    new SignInForm(qs("#container"));
  }
}
