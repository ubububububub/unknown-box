import { getMain } from "../../apis/main.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import style from "./MainRandom.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export default class MainRandom extends Component {
  template() {
    return `<ul class="main-catelist"><ul/>`;
  }
  setEvent() {
    const cateImg = [
      {
        랜덤: "../../assets/question.png"
      }
    ];

    getMain().then(result => {
      result.categories.map(x => {
        qs(".main-catelist").innerHTML += `
                    <li>
                       <a href="/rank?cate=${x.categoryId}">
                         <img src="${cateImg[0]["랜덤"]}" />
                       </a>
                       <span>${x.categoryName}</span>
                     </li>`;
      });
    });
  }
}
