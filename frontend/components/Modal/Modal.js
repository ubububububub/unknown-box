import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";

export default class Modal extends Component {
  template() {
    const modalStyle = `
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    `;
    const backStyle = `
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.1);
    `;

    const contentsStyle = `
        background-color: #fefefe;
        display:flex;
        flex-direction: column;
        align-items:center;
        border-radius: 10px;
        width: 40%;
        height: 60%;
        margin: auto;
        box-shadow: 0px 4px 10px rgb(0, 0, 0, 0.1);
        position: fixed;
    `;

    return `<div class="modal" style="${modalStyle}">
                <div class="back" style="${backStyle}"></div>
                <div class="modal-contents" style="${contentsStyle}">
                    <div class="modal-header">
                        ${this.props.headerText}
                        <button class="close-modal">X</button>
                    </div>
                    <div class="modal-body">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn modal-submit-btn">완료</button>
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
    qs(".modal-submit-btn")?.addEventListener("click", () => {
      const form = new FormData(qs(".modal-body > form"));

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
