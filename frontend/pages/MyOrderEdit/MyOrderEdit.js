import OrderEdit from "../../components/OrderEdit/OrderEdit.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";

export class MyOrderEdit extends Component {
  template() {
    return `<div id="container"></div>`;
  }

  mounted() {
    new OrderEdit(qs("#container"), this.props);
  }
}
