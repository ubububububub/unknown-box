import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import style from "./recipt.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export class Recipt extends Component {
  template() {
    return `<section id="recipt_container">
      <div class="recipt_modal">
        <h2 class="recipt_title">주문이 완료되었습니다!</h2>
        <menu class="recipt_menu">
          <button type="button" class="recipt_order-list-button">주문내역 보기</button>
          <button type="button" class="recipt_shopping-button">쇼핑 계속하기</button>
        </menu>
      </div>
    </section>`;
  }

  setEvent() {
    qs(".recipt_order-list-button").addEventListener("click", () => {
      window.location = "/mypage/order";
    });

    qs(".recipt_shopping-button").addEventListener("click", () => {
      window.location = "/";
    });
  }
}
