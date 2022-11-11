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
                <div class="order-info">
                    <div class="order-time">
                        <span>주문날짜</span>
                        <span>${createdAt}</span>
                    </div>
                    <div class="order-state">
                        <span>배송상태</span>
                        <input value="${state}"/>
                    </div>
                    <div class="orderer-info">
                        <div class="order-name">
                            <span>주문자명</span>
                            <span>${orderName}</span>
                        </div>
                        <div class="order-phone">
                            <span>전화번호</span>
                            <span>${orderPhone}</span>
                        </div>
                        <div class="order-address">
                            <div>
                            <span>우편 번호</span>
                            <p>${orderAddress.postalcode}</p>
                            </div>
                            <div>
                            <span>도로명 주소</span>
                            <p>${orderAddress.roadAddress}</p>
                            </div>
                            <div>
                            <span>지번 주소</span>
                            <p>${orderAddress.jibunAddress}</p>
                            </div>
                            <div>
                            <span>상세 주소</span>
                            <p>${orderAddress.detailAddress}</p>
                            </div>
                            <div>
                            <span>추가 주소</span>
                            <p>${orderAddress.extraAddress}</p>
                            </div>
                        </div>
                    </div>
                    <div class="order-list">
                        <span>주문상품<span>
                        <ul>
                        ${randomboxes
                          .map(
                            ({ opened, randomboxName, price, product }) =>
                              `<li>
                                <div>${randomboxName}</div>
                                <div>${price}</div>
                                <div>${
                                  opened
                                    ? `<span>당첨 상품</span>
                                  <img src="${product.thumbnail}"/>
                                  <div>${product.productName}</div>
                                  <div>${product.price}</div>`
                                    : ""
                                }
                                </div>
                            </li>`
                          )
                          .join("")}
                        </ul>
                    </div>
                    <div class="order-price">
                        <p>${boxesPrice}</p>
                        <p>${deliveryPrice}</p>
                        <p>${totalPrice}</p>
                    </div>
                </div>       
                <button type="button" class="order-submitBtn">수정 완료</button>
                <button type="button" class="order-cancelBtn">주문 취소</button>
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
