import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";

export class Recipt extends Component {
  template() {
    return `<section class="recipt">
      <h2 class="recipt__title">주문이 완료되었습니다!<h2>
      <menu class="recipt__menu">
        <button type="button" class="recipt__order-list-button">주문내역 보기</button>
        <button type="button" class="recipt__shopping-button">쇼핑 계속하기</button>
      </menu>
    </section>`;
  }

  setEvent() {
    qs(".recipt__order-list-button").addEventListener("click", async () => {
      window.location = "/mypage/order";
    });

    qs(".recipt__shopping-button").addEventListener("click", () => {
      window.location = "/";
    });
  }
}
