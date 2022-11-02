import Component from "../../core/Component.js";
import {qs} from "../../utils/index.js";

export default class Navbar extends Component {

    template () {
        return this.props.reduce((template, navItem) => {
            return template += `
                <li>
                    <a href="${navItem.path}">
                        ${navItem.title}
                    </a>
                </li>`;
        },'');
    }
}