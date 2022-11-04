import ItemList from "../../components/ItemList/ItemList.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";

export class Main extends Component {
  template() {
    return `<main id="main-container"></main>`;
  }
  mounted() {
    new ItemList(qs("#main-container"));
  }
}
