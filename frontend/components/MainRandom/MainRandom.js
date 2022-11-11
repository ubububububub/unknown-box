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
        의류: "https://cdn-icons-png.flaticon.com/512/2357/2357127.png",
        화장품: "https://cdn-icons-png.flaticon.com/512/3057/3057396.png",
        식품: "https://cdn-icons-png.flaticon.com/512/2756/2756708.png",
        가전: "https://cdn-icons-png.flaticon.com/512/3659/3659944.png",
        랜덤: "https://cdn-icons-png.flaticon.com/512/5726/5726678.png"
      }
    ];

    getMain().then(result => {
      result.categories.map(x => {
        qs(".main-catelist").innerHTML += `
                    <li>
                       <a href="/rank?cate=${x.categoryId}">
                         <img src="${
                           cateImg[0][x.categoryName] !== undefined
                             ? cateImg[0][x.categoryName]
                             : cateImg[0]["랜덤"]
                         }" />
                       </a>
                       <span>${x.categoryName}</span>
                     </li>`;
      });
    });
  }
}
