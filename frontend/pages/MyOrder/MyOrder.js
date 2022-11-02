import MyOrderList from "../../components/MyOrderList/MyOrderList.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";

export class MyOrder extends Component {
  template() {
    return `<div id="container"></div>`;
  }

  mounted() {
    new MyOrderList(qs("#container"));
  }
}
