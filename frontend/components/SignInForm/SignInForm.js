import Component from "../../core/Component";

class SignInForm extends Component {
  template() {
    return `
    <form type="submit" id="signInForm">
    <label for="email">이메일</label>
    <input type="text" id="email" name="email" />
    <label for="password">비밀번호</label>
    <input type="password" id="password" name="password" />
    <label for="passwordComfirm">비밀번호 확인</label>
    <input type="password" id="passwordComfirm" name="passwordComfirm" />
    <label for="fullName">이름</label>
    <input type="text" id="fullName" name="fullName" />
    <button type="submit" id="signInBtn">가입하기</button>
    </form>
    `;
  }
}

export default SignInForm;
