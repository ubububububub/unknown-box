import ItemList from "../../components/ItemList/ItemList.js";
import Navbar from "../../components/Navbar/Navbar.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import {MAIN_PAGE_NAV} from "../../const/index.js";

export class Main extends Component {
  template() {
    return `
           <!-- <ul id ="main-nav"></ul> -->   
            <main id="main-container"></main>
           `;
  }
  mounted() {
    // new Navbar(qs('#main-nav'), MAIN_PAGE_NAV);
    new ItemList(qs("#main-container"));
  }
}
