/* eslint-disable */

export default class Component {
  state;
  constructor(target) {
    if (!target) throw new Error("no element");
    this.target = target;
    this.setup();
    this.render();
    this.setEvent();
  }

  setup() {}

  mounted() {}

  template() {
    return "";
  }

  render() {
    this.target.innerHTML = this.template();
    this.mounted();
  }

  setEvent() {}

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}
