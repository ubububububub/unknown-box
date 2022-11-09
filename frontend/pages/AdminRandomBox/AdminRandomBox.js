import Component from "../../core/Component.js";
import Navbar from "../../components/Navbar/Navbar.js";
import RandomBoxList from "../../components/RandomBoxList/RandomBoxList.js";
import { qs } from "../../utils/index.js";
import { ADMIN_PAGE_NAV } from "../../constants/index.js";

export class AdminRandomBox extends Component {
  template() {
    return `
          <ul id="randombox-nav"></ul>
            <div id="randombox-list-container"></div>
        `;
  }

  mounted() {
    new Navbar(qs("#randombox-nav"), ADMIN_PAGE_NAV);
    new RandomBoxList(qs("#randombox-list-container"));
  }
}
