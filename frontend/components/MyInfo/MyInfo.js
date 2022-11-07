import { getMyInfo } from "../../apis/index.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";

class MyInfo extends Component {
  template() {
    const { email, role } = this.state;
    return `
              <div>
                <h2>환영합니다!</h2>
                <span>어쩌구저쩌구~</span>
              </div>
             ${
               localStorage.getItem("role") === "admin"
                 ? '<button id="admin-button">관리자 페이지</button>'
                 : "<span>일반회원</span>"
             }
              <div>
                <span>${email}</span>
              </div>
              <button class="mypage_myinfo_modal_btn">비밀번호수정하기</button>
    `;
  }

  async setup() {
    this.state = await getMyInfo();
  }

  setEvent() {
    if (qs("#admin-button")) {
      qs("#admin-button").addEventListener("click", () => {
        window.location = "/admin";
      });
    }
    qs(".mypage_myinfo_modal_btn").addEventListener("click", () => {});
  }
}

export default MyInfo;
