import { getList } from "../../apis/main.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import style from './ItemList.css' assert { type: 'css' };
document.adoptedStyleSheets.push(style);

export class ItemList extends Component {
    template() {
        return (
            `<section class="list-content">
            <section class="category">
              <h1 class="sub-title">오늘의 상품 추천</h1>
            </section>
            <section id="item-list" class="list-wrap"></section>
          </section>`
        );
    }

    setEvent() {
        getList().then(result => {
            for(let i  in result){
                qs('#item-list').innerHTML +=
                    `
                    <article class="list-item">
                       <a href="/detail/1">
                          <div class="list-img">
                            <img src="${result[i].thumbnail}" alt="">
                          </div>
                          <div class="list-info">
                            <h4>상품 이름 : ${result[i].name}</h4>
                            <p> </p>
                            <div class="list-pay">
                              <h5> ${result[i].price}</h5>
                            </div>
                          </div>
                        </a>
                    </article>`
            }
        });
    }
}

export default ItemList;

