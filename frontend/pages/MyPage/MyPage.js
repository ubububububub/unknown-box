import { getMyInfo } from "../../apis/index.js";
import MyInfo from "../../components/MyInfo/MyInfo.js";
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
    <div id="mypage-container">
      <div id="mypage-nav"></div>
      <div id="myinfo-container"></div>
    </div>
    `;
  }

  mounted() {
    new Navbar(qs("#mypage-nav"), MY_PAGE_NAV);
    new MyInfo(qs("#myinfo-container"), this.state);
  }
}
