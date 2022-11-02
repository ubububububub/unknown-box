/* eslint-disable */

export default class Component {
  state;
  constructor(target, props) {
    if (!target) throw new Error("no element");
    this.target = target;
    this.props = props;
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
