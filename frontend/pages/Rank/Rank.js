import RankList from "../../components/RankList/RankList.js"
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";

export class Rank extends Component {
  template() {
    return `<section id="ranklist-wrap"></section>`;
  }
  mounted() {
    new RankList(qs("#ranklist-wrap"));
  }
}