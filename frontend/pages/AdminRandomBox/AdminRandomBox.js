import Component from "../../core/Component.js";
import Navbar from "../../components/Navbar/Navbar.js";
import RandomBoxList from "../../components/RandomBoxList/RandomBoxList.js";
import { qs } from "../../utils/index.js";
import { ADMIN_PAGE_NAV } from "../../constants/index.js";
import style from "./adminRandomBox.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export class AdminRandomBox extends Component {
  template() {
    return `<section id="admin_randombox-container">
              <div id="admin_randombox-nav"></div>
              <div id="admin_randombox-list-wrapper"></div>
            </section>
        `;
  }

  mounted() {
    new Navbar(qs("#admin_randombox-nav"), ADMIN_PAGE_NAV);
    new RandomBoxList(qs("#admin_randombox-list-wrapper"));
  }
}
