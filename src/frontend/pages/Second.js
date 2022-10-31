import Component from "../components/Component.js";

export class Second extends Component {
  setup() {
    this.state = { val: "second" };
    console.log("second");
  }
  template() {
    return `<div>두번째 탭을 이걸로 합니다</div>`;
  }
}
