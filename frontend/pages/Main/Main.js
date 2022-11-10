import ItemList from "../../components/ItemList/ItemList.js";
import MainBanner from "../../components/MainBanner/MainBanner.js";
import Component from "../../core/Component.js";
import { cart } from "../../store/cart.js";
import { qs } from "../../utils/index.js";

export class Main extends Component {
  setup() {
    cart.initCartItem();
  }

  template() {
    return `<div id="main-banner"></div><main id="main-container"></main>`;
  }

  mounted() {
    new MainBanner(qs("#main-banner"));
    new ItemList(qs("#main-container"));
  }
}
