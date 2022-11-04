/* eslint-disable */

export default class Component {
  state;
  constructor(target, props) {
    if (!target) throw new Error("no element");
    this.target = target;
    this.props = props;
    this.run();
  }

  async run() {
    await this.setup();
    await this.render();
    await this.setEvent();
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
