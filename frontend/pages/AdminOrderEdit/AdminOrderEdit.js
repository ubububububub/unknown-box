import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import { getOrderDetail, deleteOrder, editOrder } from "../../apis/index.js";
import Navbar from "../../components/Navbar/Navbar.js";
import { ADMIN_PAGE_NAV } from "../../constants/index.js";
import style from "./adminOrderEdit.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export class AdminOrderEdit extends Component {
  async setup() {
    const orderId = this.props[0];
    const order = await getOrderDetail(orderId);
    this.state = { order };
  }

  template() {
    const {
      orderId,
      createdAt,
      state,
      orderName,
      orderPhone,
      orderAddress,
      randomboxes,
      boxesPrice,
      deliveryPrice,
      totalPrice
    } = this.state.order;

    return `<section id="admin_order-container"> 
              <div id="admin_order-nav"></div>
              <div id="admin_order-list-wrapper">
                <span class="detail-info">주문 상세 정보</span>
                <div class="detail-contents">
                    <div class="order-info">
                        <div class="order-time">
                            <span>주문날짜</span>
                            <span>${createdAt.slice(0, 10)}</span>
                        </div>
                        <div class="order-state">
                            <span>배송상태</span>
                            <input value="${state}"/>
                        </div>
                        <div class="order-name">
                            <span>주문자명</span>
                            <span>${orderName}</span>
                        </div>
                        <div class="order-phone">
                            <span>전화번호</span>
                            <span>${orderPhone}</span>
                        </div>
                        <div>
                            <span>우편 번호</span>
                            <span>${orderAddress.postalcode}</span>
                          </div>
                          <div>
                            <span>도로명 주소</span>
                            <span>${orderAddress.roadAddress}</span>
                          </div>
                        <div>
                          <span>지번 주소</span>
                          <span>${orderAddress.jibunAddress}</span>
                        </div>
                        <div>
                          <span>상세 주소</span>
                          <span>${orderAddress.detailAddress}</span>
                        </div>
                        <div>
                          <span>추가 주소</span>
                          <span>${orderAddress.extraAddress}</span>
                        </div>
                      </div>
                  <div class="order-wrapper">
                    <div class="order-list">
                        <ul>
                        <span class="order-product">주문 상품</span>
                        ${randomboxes
                          .map(
                            ({ opened, randomboxName, price, product }) =>
                              `
                                <li class="order-item">
                                  <div>
                                      <div>${randomboxName}</div>
                                      <div>${price.toLocaleString()}원</div>
                                    <div class="selected-product">${
                                      opened
                                        ? `<p class="order-product">당첨 상품</p>
                                      <img src="${product.thumbnail}"/>
                                      <div>${product.productName}</div>
                                      <div>${product.price.toLocaleString()}원</div>`
                                        : ""
                                    }
                                  </div>
                            </li>`
                          )
                          .join("")}
                        </ul>
                      </div>
                  
                    <div class="order-price">
                        <div>
                          <span>가격</span>
                          <span>${boxesPrice.toLocaleString()}원</span>
                        </div>
                        <div>
                          <span>배송비</span>
                          <span>${deliveryPrice.toLocaleString()}원</span>
                        </div>
                        <div>
                          <span>배송비</span>
                          <span>${totalPrice.toLocaleString()}원</span>
                        </div>
                    </div>
                  </div>
                </div>
                <div class="order-btns"> 
                  <button type="button" class="order-submitBtn">수정 완료</button>
                  <button type="button" class="order-cancelBtn">주문 취소</button>
                </div>
          </div>
        </section>
        `;
  }
  mounted() {
    new Navbar(qs("#admin_order-nav"), ADMIN_PAGE_NAV);
  }
  setEvent() {
    const { orderId } = this.state.order;

    qs(".order-submitBtn").addEventListener("click", async () => {
      const state = qs(".order-state input").value;
      await editOrder(orderId, { state });
      location = "/admin/order";
    });

    qs(".order-cancelBtn").addEventListener("click", async () => {
      await deleteOrder(orderId);
      location = "/admin/order";
    });
  }
}
