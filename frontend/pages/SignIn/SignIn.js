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

export class SignIn extends Component {
  template() {
    return `<div id="signin_contaniner"></div>
            <button class="signin_signin_btn">회원가입</button>
            <button class="signin_login_btn">로그인</button>`;
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
    new Form(qs("#signin_contaniner"), { formChildren });
  }

  setEvent() {
    qs(".signin_signin_btn").addEventListener("click", e => {
      this.handleSignIn(e);
    });
  }

  handleSignIn(e) {
    e.preventDefault();

    if (
      emailValidation(qs("#email").value) &&
      passwordValidation(qs("#password").value, qs("#passwordConfirm").value) &&
      passwordConfirmValidation(
        qs("#password").value,
        qs("#passwordConfirm").value
      ) &&
      nameValidation(qs("#name").value)
    ) {
      postSignIn(Form.getFormData());
    }
  }
}
