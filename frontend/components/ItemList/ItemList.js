import {getList, getMain} from "../../apis/main.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import style from "./ItemList.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export class ItemList extends Component {
    template() {
        return (
            `<div class="ltemList-title">
                <h1>오늘의 상품 추천</h1>
              </div>
             <ul id="ltemList-listwrap"></ul>`
        );
    }

    setEvent() {
        getMain().then(result => {
            result.randomboxes.map( x =>{
                console.log(x);
                qs("#ltemList-listwrap").innerHTML +=
                    `<li class="ltemList-item">
                 <a href="/detail/${x.randomboxId}">
                  <div class="ltemList-img">
                    <img src="${x.thumbnail}" alt="">
                  </div>
                  <div class="ltemList-info">
                    <h4>${x.randomboxName}</h4>
                    <div class="ltemList-pay">
                      <h5>${x.price} 원</h5>
                    </div>
                  </div>
                </a>
            </li>`
            });
        });
    }
}

export default ItemList;