import { postMyPassword } from "../../apis/index.js";
import Component from "../../core/Component.js";
import { MODAL, passwordConfirmValidation, qs } from "../../utils/index.js";
import Modal from "../Modal/Modal.js";
import style from "./myInfo.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

class MyInfo extends Component {
  template() {
    const { email, benefit } = this.props;
    return `<div class="myinfo-container">
              <div class="myinfo-myinfo-section">
                <span class="myinfo-section-title">내 정보</span>
                <span>${email}</span>
                <button class="mypage_myinfo_modal_btn">비밀번호 변경</button>
                ${
                  localStorage.getItem("role") === "admin"
                    ? '<button id="admin-button">관리자 페이지</button>'
                    : ""
                }
              </div>
              <div class="myinfo-myprofit-section">
                <span class="myinfo-section-title">얼마나 이득봤을까요?</span>
                <div class="myinfo-myprofit-wrapper">
                  <div class="myinfo-myprofit-item">
                    <img src="../../assets/chicken.png" width="64px"/>
                    <span>치킨 ${Math.floor(benefit / 20000)}마리</span>
                  </div>
                  <div class="myinfo-myprofit-item">
                    <img src="../../assets/coffee.png" width="64px">
                    <span>커피 ${Math.floor(benefit / 4500)}잔</span>
                  </div>
                  <div class="myinfo-myprofit-item">
                    <img src="../../assets/dollars.png" width="64px">
                    <span>${benefit}원</span>
                  </div>
                </div>
              </div>
            </div>
    `;
  }

  setEvent() {
    qs("#admin-button")?.addEventListener("click", () => {
      window.location = "/admin";
    });

    qs(".mypage_myinfo_modal_btn").addEventListener("click", e => {
      e.preventDefault();
      new Modal(qs("#app"), {
        id: this.props.categoryId,
        headerText: "비밀번호 변경",
        type: "EDIT",
        contents: {
          body: [
            MODAL.Form({}, [
              MODAL.Span({}, ["현재 비밀번호"]),
              MODAL.Input({
                type: "password",
                name: "password"
              }),
              MODAL.Span({}, ["새로운 비밀번호"]),
              MODAL.Input({
                type: "password",
                name: "newPassword"
              }),
              MODAL.Span({}, ["새로운 비밀번호 확인"]),
              MODAL.Input({
                type: "password",
                name: "newPasswordConfirm"
              })
            ])
          ]
        },
        submit: this.handleChangePassword
      });
    });
  }

  handleChangePassword(id, formData) {
    const password = qs('[name="newPassword"]');
    const passwordConfirm = qs('[name="newPasswordConfirm"]');
    if (
      passwordConfirm(password) &&
      passwordConfirmValidation(password, passwordConfirm)
    ) {
      // postMyPassword(formData);
    }
  }
}

export default MyInfo;
