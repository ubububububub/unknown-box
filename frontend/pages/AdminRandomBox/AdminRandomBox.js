import Component from "../../core/Component.js";
import Navbar from "../../components/Navbar/Navbar.js";
import RandomBoxList from "../../components/RandomBoxList/RandomBoxList.js";
import { qs } from "../../utils/index.js";
import { ADMIN_PAGE_NAV } from "../../constants/index.js";
import style from "./adminRandomBox.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export class AdminRandomBox extends Component {
  template() {
    return `<section id="admin-randombox-section">
              <div id="admin-randombox-nav"></div>
              <div id="admin-randombox-list-wrapper"></div>
            </section>
        `;
  }

  mounted() {
    new Navbar(qs("#admin-randombox-nav"), ADMIN_PAGE_NAV);
    new RandomBoxList(qs("#admin-randombox-list-wrapper"));
  }
}
