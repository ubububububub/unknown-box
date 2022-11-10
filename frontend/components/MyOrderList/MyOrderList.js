import { getMyOrder } from "../../apis/index.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import MyOrderItem from "../MyOrderItem/MyOrderItem.js";
import style from "./myOrderList.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

class MyOrderList extends Component {
  async setup() {
    const mockData = [
      {
        orderId: 1,
        createdAt: "22-10-13",
        orderState: "입금확인",
        totalPrice: 10000,
        randomboxes: [
          {
            randomboxId: 1,
            randomboxName: "브론즈 박스",
            thumbnail:
              "https://media.istockphoto.com/vectors/box-icon-on-transparent-background-vector-id1283411784?k=20&m=1283411784&s=170667a&w=0&h=bPW22hB06NP99mVas3RvvMGouiYvqd75rdcv5brSZkg=",
            products: {
              productId: 1,
              productName: "청바지",
              thumbnail:
                "https://image.zdnet.co.kr/2022/03/03/e5c4619a509cbb6dcbd3713a6baee749.png"
            }
          },
          {
            randomboxId: 1,
            randomboxName: "브론즈 박스",
            thumbnail:
              "https://media.istockphoto.com/vectors/box-icon-on-transparent-background-vector-id1283411784?k=20&m=1283411784&s=170667a&w=0&h=bPW22hB06NP99mVas3RvvMGouiYvqd75rdcv5brSZkg="
          },
          {
            randomboxId: 4,
            randomboxName: "플레티넘 박스",
            thumbnail:
              "https://media.istockphoto.com/vectors/box-icon-on-transparent-background-vector-id1283411784?k=20&m=1283411784&s=170667a&w=0&h=bPW22hB06NP99mVas3RvvMGouiYvqd75rdcv5brSZkg=",
            products: {
              productId: 1,
              productName: "반바지",
              thumbnail:
                "https://image.zdnet.co.kr/2022/03/03/e5c4619a509cbb6dcbd3713a6baee749.png"
            }
          }
        ]
      },
      {
        orderId: 5,
        createdAt: "22-10-10",
        orderState: "배송중",
        totalPrice: 1000000,
        randomboxes: [
          {
            randomboxId: 1,
            randomboxName: "브론즈 박스",
            thumbnail:
              "https://media.istockphoto.com/vectors/box-icon-on-transparent-background-vector-id1283411784?k=20&m=1283411784&s=170667a&w=0&h=bPW22hB06NP99mVas3RvvMGouiYvqd75rdcv5brSZkg=",
            products: {
              productId: 1,
              productName: "청바지",
              thumbnail:
                "https://image.zdnet.co.kr/2022/03/03/e5c4619a509cbb6dcbd3713a6baee749.png"
            }
          },
          {
            randomboxId: 1,
            randomboxName: "브론즈 박스",
            thumbnail:
              "https://media.istockphoto.com/vectors/box-icon-on-transparent-background-vector-id1283411784?k=20&m=1283411784&s=170667a&w=0&h=bPW22hB06NP99mVas3RvvMGouiYvqd75rdcv5brSZkg=",
            products: {
              productId: 1,
              productName: "아이폰",
              thumbnail:
                "https://image.zdnet.co.kr/2022/03/03/e5c4619a509cbb6dcbd3713a6baee749.png"
            }
          },
          {
            randomboxId: 1,
            randomboxName: "브론즈 박스",
            thumbnail:
              "https://media.istockphoto.com/vectors/box-icon-on-transparent-background-vector-id1283411784?k=20&m=1283411784&s=170667a&w=0&h=bPW22hB06NP99mVas3RvvMGouiYvqd75rdcv5brSZkg=",
            products: {
              productId: 1,
              productName: "맥북",
              thumbnail:
                "https://image.zdnet.co.kr/2022/03/03/e5c4619a509cbb6dcbd3713a6baee749.png"
            }
          },
          {
            randomboxId: 1,
            randomboxName: "브론즈 박스",
            thumbnail:
              "https://media.istockphoto.com/vectors/box-icon-on-transparent-background-vector-id1283411784?k=20&m=1283411784&s=170667a&w=0&h=bPW22hB06NP99mVas3RvvMGouiYvqd75rdcv5brSZkg="
          },
          {
            randomboxId: 3,
            randomboxName: "골드 박스",
            thumbnail:
              "https://media.istockphoto.com/vectors/box-icon-on-transparent-background-vector-id1283411784?k=20&m=1283411784&s=170667a&w=0&h=bPW22hB06NP99mVas3RvvMGouiYvqd75rdcv5brSZkg="
          },
          {
            randomboxId: 4,
            randomboxName: "플레티넘 박스",
            thumbnail:
              "https://media.istockphoto.com/vectors/box-icon-on-transparent-background-vector-id1283411784?k=20&m=1283411784&s=170667a&w=0&h=bPW22hB06NP99mVas3RvvMGouiYvqd75rdcv5brSZkg=",
            products: {
              productId: 1,
              productName: "쿠쿠 밥솥 10000인분 조리가능",
              thumbnail:
                "https://image.zdnet.co.kr/2022/03/03/e5c4619a509cbb6dcbd3713a6baee749.png"
            }
          }
        ]
      },
      {
        orderId: 2,
        createdAt: "22-10-09",
        orderState: "배송완료",
        totalPrice: 100000,
        randomboxes: [
          {
            randomboxId: 1,
            randomboxName: "브론즈 박스",
            thumbnail:
              "https://media.istockphoto.com/vectors/box-icon-on-transparent-background-vector-id1283411784?k=20&m=1283411784&s=170667a&w=0&h=bPW22hB06NP99mVas3RvvMGouiYvqd75rdcv5brSZkg="
          },
          {
            randomboxId: 3,
            randomboxName: "골드 박스",
            thumbnail:
              "https://media.istockphoto.com/vectors/box-icon-on-transparent-background-vector-id1283411784?k=20&m=1283411784&s=170667a&w=0&h=bPW22hB06NP99mVas3RvvMGouiYvqd75rdcv5brSZkg="
          },
          {
            randomboxId: 4,
            randomboxName: "플레티넘 박스",
            thumbnail:
              "https://media.istockphoto.com/vectors/box-icon-on-transparent-background-vector-id1283411784?k=20&m=1283411784&s=170667a&w=0&h=bPW22hB06NP99mVas3RvvMGouiYvqd75rdcv5brSZkg=",
            products: {
              productId: 1,
              productName: "청바지",
              thumbnail:
                "https://image.zdnet.co.kr/2022/03/03/e5c4619a509cbb6dcbd3713a6baee749.png"
            }
          }
        ]
      }
    ];

    this.state = { mockData };
    // const data = await getMyOrder();
  }

  template() {
    return `<div id="myorderlist-container"></div>`;
  }

  mounted() {
    this.state.mockData.forEach(
      (item, idx) =>
        new MyOrderItem(qs("#myorderlist-container"), {
          item,
          idx,
          deleteOrder: this.deleteOrder.bind(this)
        })
    );
  }

  deleteOrder(deleteOrderId) {
    const newItem = this.state.mockData.filter(
      order => order.orderId !== deleteOrderId
    );
    this.setState({ mockData: [...newItem] });
  }
}

export default MyOrderList;
