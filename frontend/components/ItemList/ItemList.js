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
            let randomArr = [];
            // 데이터가 없을경우 임시로 목록 데이터 생성
            if(!result) {
                result 	= new Array();
                for(let i = 1 ; i <= 20 ;i++){
                    let jsonObj	= new Object();
                    jsonObj.id = i;
                    jsonObj.name = "상품"+i;
                    jsonObj.price	= i*100;
                    jsonObj.thumbnail ="http://unsplash.it/400/400?random="+i;
                    jsonObj = JSON.stringify(jsonObj);
                    result.push(JSON.parse(jsonObj));
                 }
            }
            // 받아온 데이터 20개중 랜덤한 8개의 상품 재정비
            while(result.length > 8){
                let randomResult = result.splice(Math.floor(Math.random() * result.length),1)[0]
                randomArr.push(randomResult)
            }

            for(let i  in result){
                qs('#item-list').innerHTML +=
                    `
                    <article class="list-item">
                       <a href="/detail/${randomArr[i].id}">
                          <div class="list-img">
                            <img src="${randomArr[i].thumbnail}" alt="">
                          </div>
                          <div class="list-info">
                            <h4>상품 이름 : ${randomArr[i].name}</h4>
                            <p> </p>
                            <div class="list-pay">
                              <h5> ${randomArr[i].price}</h5>
                            </div>
                          </div>
                        </a>
                    </article>`
            }
        });
    }
}

export default ItemList;

