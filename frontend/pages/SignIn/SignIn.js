import { postSignIn } from "../../apis/index.js";
import Form from "../../components/Form/Form.js";
import Component from "../../core/Component.js";
import {
  emailValidation,
  nameValidation,
  passwordConfirmValidation,
  passwordValidation,
  qs
} from "../../utils/index.js";
import style from "./signIn.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export class SignIn extends Component {
  template() {
    return `<div id="signin_contaniner">
            <div id="signin_section">
            <H1>회원가입</H1>
            <div id="signin-form_section"></div>
            <button class="signin_signin_btn">회원가입</button>
            </div>
            </div>
            `;
  }

  mounted() {
    const formChildren = [
      {
        id: "name",
        title: "성함",
        type: "text"
      },
      {
        id: "email",
        title: "이메일",
        type: "text"
      },
      {
        id: "password",
        title: "비밀번호",
        type: "password"
      },
      {
        id: "passwordConfirm",
        title: "비밀번호 확인",
        type: "password"
      }
    ];
    new Form(qs("#signin-form_section"), { formChildren });
  }

  setEvent() {
    qs(".signin_signin_btn").addEventListener("click", e => {
      this.handleSignIn(e);
    });
  }

  handleSignIn(e) {
    e.preventDefault();

    if (
      emailValidation(qs("#email")) &&
      passwordValidation(qs("#password")) &&
      passwordConfirmValidation(qs("#password"), qs("#passwordConfirm")) &&
      nameValidation(qs("#name"))
    ) {
      postSignIn(Form.getFormData());
    }
  }
}
