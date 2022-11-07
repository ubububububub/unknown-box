import { postLogin } from "../../apis/index.js";
import Form from "../../components/Form/Form.js";
import Component from "../../core/Component.js";
import { emailValidation, passwordValidation, qs } from "../../utils/index.js";

export class Login extends Component {
  template() {
    return `<div id="login_contaniner"></div>
    <button class="login_login_btn">로그인</button>
    <button class="login_signin_btn">회원가입</button>
    <button class="login_logout_btn">로그아웃</button>`;
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
    new Form(qs("#login_contaniner"), { formChildren });
  }

  setEvent() {
    qs(".login_signin_btn").addEventListener("click", () => {
      window.location = "/signin";
    });

    qs(".login_logout_btn").addEventListener("click", e => {
      this.handleLogout(e);
    });

    qs(".login_login_btn").addEventListener("click", e => {
      this.handleLogin(e);
    });
  }

  handleLogout(e) {
    e.preventDefault();

    function deleteCookie(token) {
      document.cookie = token + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    localStorage.removeItem("role");
  }

  handleLogin(e) {
    e.preventDefault();

    if (
      emailValidation(qs("#email").value) &&
      passwordValidation(qs("#password").value)
    ) {
      postLogin(Form.getFormData());
    }
  }
}
