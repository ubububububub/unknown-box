import DetailView from "../../components/DetailView/DetailView.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";

export class Detail extends Component {
  template() {
    return `<section id="detail-container"></section>`;
  }

  mounted() {
    new DetailView(qs("#detail-container"), ...this.props);
  }
}
