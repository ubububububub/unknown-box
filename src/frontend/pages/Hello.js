import Component from "../components/Component.js";

export class Hello extends Component {
  setup() {
    console.log("hello");
  }
  template() {
    return `<div>세번째 탭을 이걸로 합니다</div>`;
  }
}
