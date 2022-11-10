import { getMyInfo } from "../../apis/index.js";
import MyInfo from "../../components/MyInfo/MyInfo.js";
import MyRandomBox from "../../components/MyRandomBox/MyRandomBox.js";
import Navbar from "../../components/Navbar/Navbar.js";
import { MY_PAGE_NAV } from "../../constants/index.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import style from "./myPage.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export class MyPage extends Component {
  async setup() {
    this.state = await getMyInfo();
  }

  template() {
    return `
    <div id="mypage-nav"></div>
    <div id="mypage-container">
      <div id="mypage-myinfo-container"></div>
      <div id="mypage-myrandombox-container"></div>
    </div>
    `;
  }

  mounted() {
    const mockData = {
      email: "asdfasdf@asdfasdf.com",
      role: "user",
      benefit: 1000000,
      randomboxes: [
        {
          randomboxId: "1",
          randomboxName: "그냥 랜덤박스",
          thumbnail:
            "https://image.zdnet.co.kr/2022/03/03/e5c4619a509cbb6dcbd3713a6baee749.png",
          price: 20000,
          orderId: "56"
        },
        {
          randomboxId: "2",
          randomboxName: "비싼 랜덤박스",
          thumbnail:
            "https://image.zdnet.co.kr/2022/03/03/e5c4619a509cbb6dcbd3713a6baee749.png",
          price: 100000,
          orderId: "78"
        }
      ],
      products: [
        {
          productId: "3",
          productName: "인형",
          thumbnail:
            "https://image.zdnet.co.kr/2022/03/03/e5c4619a509cbb6dcbd3713a6baee749.png"
        },
        {
          productId: "4",
          productName: "노트북",
          thumbnail:
            "https://image.zdnet.co.kr/2022/03/03/e5c4619a509cbb6dcbd3713a6baee749.png"
        }
      ]
    };

    new Navbar(qs("#mypage-nav"), MY_PAGE_NAV);
    new MyInfo(qs("#mypage-myinfo-container"), mockData);
    new MyRandomBox(qs("#mypage-myrandombox-container"), mockData);
  }
}
