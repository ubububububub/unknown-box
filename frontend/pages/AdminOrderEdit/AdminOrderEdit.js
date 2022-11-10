import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
// import { getOrderDetail, deleteOrder, editOrder } from "../../apis/index.js";

export class AdminOrderEdit extends Component {
  setup() {
    const orderId = location.pathname.split("/").pop();
    //const order = await getOrderDetail(orderId);

    const mockData = {
      orderId: 1,
      orderTime: "22-10-10",
      orderState: "배송준비중",
      orderName: "이상조",
      orderPhone: "01074253535",
      orderAddress: {
        postcode: "123123",
        roadAddress: "사랑시 고백구 행복동",
        jibunAddress: "사랑시 고백구 행복동",
        detailAddress: "상세한주소",
        extraAddress: "이건뭐이야"
      },
      randomboxes: [{ randomboxName: "의류 랜덤박스 Dia", count: 2 }],
      boxesPrice: 60000,
      deliveryPrice: 3000,
      totalPrice: 63000,
      createdAt: "22-10-10",
      updatedAt: "22-10-12"
    };
    this.state = { order: mockData };
  }
  template() {
    const {
      orderId,
      orderTime,
      orderState,
      orderName,
      orderPhone,
      orderAddress,
      randomboxes,
      boxesPrice,
      deliveryPrice,
      totalPrice
    } = this.state.order;

    return `<section id="order-edit-container">
            <h2>주문 상세 정보</h2>
                <div class="order-info">
                    <div class="order-time">
                        <span>주문날짜</span>
                        <span>${orderTime}</span>
                    </div>
                    <div class="order-state">
                        <span>배송상태</span>
                        <input value="${orderState}"/>
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
                            <span>우편 번호</span>
                            <p>${orderAddress.postcode}</p>
                            <span>도로명 주소</span>
                            <p>${orderAddress.roadAddress}</p>
                            <span>지번 주소</span>
                            <p>${orderAddress.jibunAddress}</p>
                            <span>상세 주소</span>
                            <p>${orderAddress.detailAddress}</p>
                            <span>추가 주소</span>
                            <p>${orderAddress.extraAddress}</p>
                        </div>
                    <div>
                    <div class="order-list">
                        <span>주문상품<span>
                        <ul>
                        ${randomboxes
                          .map(
                            ({ randomboxName, price, count }) =>
                              `<li>
                                <div>${randomboxName}</div>
                                <div>${price}</div>
                                <div>${count}</div>
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
            </section>
        `;
  }

  setEvent() {
    const { orderId } = this.state.order;

    qs(".order-submitBtn").addEventListener("click", async () => {
      const orderState = qs(".order-state > input").value;
      // await editOrder(orderId, orderState);
      location = "/admin/order";
    });

    qs(".order-cancelBtn").addEventListener("click", async () => {
      // await deleteOrder(orderId);
      location = "/admin/order";
    });
  }
}
