import Component from "../../core/Component.js";

export default class OrderItem extends Component {
  template() {
    const { orderId, orderTime, orderProducts, orderState } = this.props;
    return `
            <tr id="order-item">
                <td>${orderId}</td>
                <td>${orderTime}</td>
                <td>
                    ${orderProducts[0].productInfo.productName}
                    ${
                      orderProducts.length > 1
                        ? `외 ${orderProducts.length - 1}개`
                        : ""
                    }
                </td>
                <td>
                    ${orderProducts
                      .reduce((total, { productInfo, quantity }) => {
                        total += productInfo.price * quantity;
                        return total;
                      }, 0)
                      .toLocaleString()}원
                </td>
                <td>${orderState}</td>
                <td>
                    <button type="button">주문수정</button>
                </td>
                <td>
                    <button type="button">주문삭제</button>
                </td>
            </tr>
        `;
  }

  render() {
    this.target.insertAdjacentHTML("beforeend", this.template());
  }
}
