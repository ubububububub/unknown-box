import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";

class SignInForm extends Component {
  template() {
    return `
    <form id="signInForm" method="POST">
    <label for="email">이메일</label>
    <input type="text" id="email" name="email" />
    <label for="password">비밀번호</label>
    <input type="password" id="password" name="password" />
    <label for="passwordComfirm">비밀번호 확인</label>
    <input type="password" id="passwordComfirm" name="passwordComfirm" />
    <label for="fullName">이름</label>
    <input type="text" id="name" name="name" />
    <input type="submit" class="signInBtn" value="가입하기"/>
    </form>
    `;
  }

  setEvent() {
    qs("#signInForm").addEventListener("submit", e => {
      e.preventDefault();
      const [email, password, passwordComfirm, name] = e.target;
      if (
        this.emailValidation(email.value) &&
        this.passwordValidation(password.value, passwordComfirm.value) &&
        this.nameValidation(name.value)
      ) {
        const signInData = {
          email: email.value,
          password: password.value,
          name: name.value
        };
        this.postSignIn(signInData);
      }
    });
  }

  emailValidation(email) {
    const RegExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (!email) {
      alert("이메일 주소를 입력해주세요.");
      return false;
    }
    if (!RegExp.test(email)) {
      alert("올바른 이메일 형식이 아닙니다.");
      return false;
    }

    return true;
  }

  passwordValidation(password, passwordComfirm) {
    const RegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return false;
    }
    if (!RegExp.test(password)) {
      alert("비밀번호는 8~16자의 영문자+숫자+특수문자로 입력해주세요.");
      return false;
    }
    if (password !== passwordComfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return false;
    }

    return true;
  }

  nameValidation(name) {
    const RegExp = /^[가-힣]{2,15}$/;

    if (!name) {
      alert("성함를 입력해주세요.");
      return false;
    }
    if (!RegExp.test(name)) {
      alert("올바른 성함을 입력해주세요.");
      return false;
    }

    return true;
  }

  async postSignIn(data) {
    try {
      const response = await fetch("http://localhost:8080/api/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(response => response.json());
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default SignInForm;
