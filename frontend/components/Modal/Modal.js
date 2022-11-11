import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import style from "./modal.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export default class Modal extends Component {
  template() {
    return `<div class="modal">
                <div class="modal-contents">
                    <h3 class="modal-header">
                        ${this.props.headerText}
                        <button class="close-modal">X</button>
                    </h3>
                    <div class="modal-body">
                    </div>
                    <div class="modal-footer">
                      <button type="submit" class="btn modal-submit-btn">완료</button>
                    </div>
                </div>
            </div>`;
  }

  render() {
    this.target.insertAdjacentHTML("afterbegin", this.template());
    const { contents } = this.props;
    contents.header && qs(".modal-header").append(...contents.header);
    contents.body && qs(".modal-body").append(...contents.body);
    contents.footer && qs(".modal-footer").append(...contents.footer);
  }

  setEvent() {
    qs(".modal-submit-btn").addEventListener("click", e => {
      e.preventDefault();
      if (this.props.type === "ANSWER") {
        const newValue = qs(".modal-body textarea").value;

        this.props.submit(this.props.id, newValue);

        return;
      }
      const form = new FormData(qs(".modal-body form"));
      this.props.type === "ADD"
        ? this.props.submit(form)
        : this.props.submit(this.props.id, form);
    });

    qs(".close-modal").addEventListener("click", () => {
      this.close();
    });
  }

  close() {
    const modal = this.target.querySelector(".modal");
    this.target.removeChild(modal);
  }
}
