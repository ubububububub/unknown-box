import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";

class LoginForm extends Component {
  template() {
    return `<form class="login-form" >
    <label for="email">이메일
    </label>
    <input type="text" id="email" name="email" />
    <label for="password">비밀번호
    </label>
    <input type="password" class="password" name="password"/>
    <button class="loginBtn" type="submit" >로그인하기</button>
   </form>
    <button class="signin-btn" >회원가입하기</button>
    `;
  }
}

export default LoginForm;
