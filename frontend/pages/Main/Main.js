import ItemList from "../../components/ItemList/ItemList.js";
import MainBanner from "../../components/MainBanner/MainBanner.js";
import MainRandom from "../../components/MainRandom/MainRandom.js";
import Component from "../../core/Component.js";
import { cart } from "../../store/cart.js"
import { qs } from "../../utils/index.js";

export class Main extends Component {
  setup() {
    cart.initCartItem() 
  }
  template() {
    return `<section id="main-banner"></section><section id="main-container"></section><section id="main-random"></section>`;
  }
  mounted() {
    new MainBanner(qs("#main-banner"));
    new ItemList(qs("#main-container"));
    new MainRandom(qs("#main-random"));
  }

}