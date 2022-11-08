import Component from "../../core/Component.js";
import style from "./MainBanner.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export default class MainBanner extends Component {
    template() {
        return `
            <div class="main-banner"></div>
        `;
    }

    setEvent() {

    }

    render() {
        this.target.innerHTML += this.template();
    }

}