import { postLogin } from "../../apis/index.js";
import Form from "../../components/Form/Form.js";
import Component from "../../core/Component.js";
import { emailValidation, passwordValidation, qs } from "../../utils/index.js";
import style from "./login.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export class Login extends Component {
  template() {
    return `
    <div id="login_contaniner">
      <div id="login_section">
        <H1>로그인</H1>
        <div id="login-form_section"></div>
        <button class="login-signin_btn form_btn">아직 회원이 아니신가요?</button>
        <button class="login-login_btn form_btn">로그인</button>
        <button class="login-kakao-login_btn form_btn">카카오 로그인</button>
      </div>
    </div>`;
  }

  mounted() {
    const formChildren = [
      {
        id: "email",
        title: "이메일",
        type: "text"
      },
      {
        id: "password",
        title: "비밀번호",
        type: "password"
      }
    ];
    new Form(qs("#login-form_section"), { formChildren });
  }

  setEvent() {
    qs(".login-signin_btn").addEventListener("click", () => {
      window.location = "/signin";
    });

    qs(".login-login_btn").addEventListener("click", e => {
      this.handleLogin(e);
    });
  }

  handleLogin(e) {
    e.preventDefault();

    if (emailValidation(qs("#email")) && passwordValidation(qs("#password"))) {
      postLogin(Form.getFormData());
    }
  }
}
