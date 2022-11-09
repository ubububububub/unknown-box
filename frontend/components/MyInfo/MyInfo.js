import { getMyInfo } from "../../apis/index.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import style from "./myInfo.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

class MyInfo extends Component {
  template() {
    const { email, role } = this.props;
    return `<div class="myinfo-container">
              <div class="myinfo-myinfo-section">
                <span class="myinfo-section-title">내 정보</span>
                ${
                  localStorage.getItem("role") === "admin"
                    ? '<button id="admin-button">관리자 페이지</button>'
                    : ""
                }
                <span>${email}</span>
                <button class="mypage_myinfo_modal_btn">비밀번호 수정</button>
              </div>
              <div class="myinfo-myprofit-section">
                <span class="myinfo-section-title">얼마나 이득봤을까요?</span>
                <div class="myinfo-myprofit-wrapper">
                  <div class="myinfo-myprofit-item">
                    <img src="../../assets/chicken.png" width="64px"/>
                    <span>치킨 100마리</span>
                  </div>
                  <div class="myinfo-myprofit-item">
                    <img src="../../assets/coffee.png" width="64px">
                    <span>커피 100잔</span>
                  </div>
                  <div class="myinfo-myprofit-item">
                    <img src="../../assets/dollars.png" width="64px">
                    <span>100000원</span>
                  </div>
                </div>
              </div>
            </div>
    `;
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
