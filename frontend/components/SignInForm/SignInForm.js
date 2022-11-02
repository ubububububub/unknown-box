import { postSignIn } from "../../apis/index.js";
import Component from "../../core/Component.js";
import {
  qs,
  emailValidation,
  passwordValidation,
  passwordConfirmValidation,
  nameValidation
} from "../../utils/index.js";

class SignInForm extends Component {
  template() {
    return `
    <form id="signInForm" method="POST">
    <label for="email">이메일</label>
    <input type="text" id="email" name="email" />
    <label for="password">비밀번호</label>
    <input type="password" id="password" name="password" />
    <label for="passwordConfirm">비밀번호 확인</label>
    <input type="password" id="passwordConfirm" name="passwordConfirm" />
    <label for="fullName">이름</label>
    <input type="text" id="name" name="name" />
    <input type="submit" class="signInBtn" value="가입하기"/>
    </form>
    `;
  }

  setEvent() {
    qs("#signInForm").addEventListener("submit", e => {
      this.handleSignIn(e);
    });
  }

  handleSignIn(e) {
    e.preventDefault();
    const [email, password, passwordConfirm, name] = Array.from(e.target).map(
      item => item.value
    );
    if (
      emailValidation(email) &&
      passwordValidation(password, passwordConfirm) &&
      passwordConfirmValidation(password, passwordConfirm) &&
      nameValidation(name)
    ) {
      const signInData = {
        email,
        password,
        name
      };
      postSignIn(signInData);
    }
  }
}

export default SignInForm;
