import Component from "../components/Component.js";

export class Main extends Component {
  setup() {
    console.log("메인입니다");
  }

  template() {
    return `<div>첫번째 탭을 이걸로 합니다</div>`;
  }
}
