import Component from "../../core/Component.js";
import style from "./notFound.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export class NotFound extends Component {
  template() {
    return `
    <div id="notfound-container">
    <H1>Page not found</H1>
    <button class="form_btn">메인으로</button>
    </div>
    `;
  }
}
