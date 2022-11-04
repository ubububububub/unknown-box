import Component from "../../core/Component.js";

export default class Navbar extends Component {
  template() {
    return this.props.reduce((template, navItem) => {
      template += `
                <li>
                    <a href="${navItem.path}">
                        ${navItem.title}
                    </a>
                </li>`;
      return template;
    }, "");
  }
}
