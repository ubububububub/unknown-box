import { getList } from "../../apis/main.js";
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
        getList().then(result => {
            let randomArr = [];
            let category = ["의류", "화장품", "식품", "가전", "랜덤"];

            if(!result) {
                result 	= new Array();

                for(let i = 1 ; i <= 5 ;i++){
                    let jsonObj	= new Object();
                    jsonObj.id = i;
                    jsonObj.name = "상품"+i;
                    jsonObj.price	= i*100;
                    jsonObj.thumbnail ="http://unsplash.it/400/400?random="+i;
                    jsonObj = JSON.stringify(jsonObj);
                    result.push(JSON.parse(jsonObj));
                 }
            }

            for(let i  in result){
                qs("#ltemList-listwrap").innerHTML +=
                    `
                    <li class="ltemList-item">
                       <a href="/detail/${result[i].id}">
                          <div class="ltemList-img">
                            <img src="${result[i].thumbnail}" alt="">
                          </div>
                          <div class="ltemList-info">
                            <h4>상품 이름 : ${result[i].name}</h4>
                            <p> </p>
                            <div class="ltemList-pay">
                              <h5> ${result[i].price}</h5>
                            </div>
                          </div>
                        </a>
                    </li>`
            }
        });
    }
}

export default ItemList;