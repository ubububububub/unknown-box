import MyInfo from "../../components/MyInfo/MyInfo.js";
import Navbar from "../../components/Navbar/Navbar.js";
import { MY_PAGE_NAV } from "../../constants/index.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";

export class MyPage extends Component {
  template() {
    return `<ul id="mypage-nav"></ul>
    <div id="myinfo-container"></button>`;
  }

  mounted() {
    new Navbar(qs("#mypage-nav"), MY_PAGE_NAV);
    new MyInfo(qs("#myinfo-container"));
  }
}
