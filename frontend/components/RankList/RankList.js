import { getCate } from "../../apis/main.js";
import Component from "../../core/Component.js";
import style from "./RankList.css" assert { type: "css" };
import {qs} from "../../utils/index.js";
document.adoptedStyleSheets.push(style);

export default class RankList extends Component {
    template() {
        return `
              <ul id="rankItem" class="rank-list">
            `;
    }

    mounted() {
        const urlParams = new URL(location.href).searchParams;
        const cate = urlParams.get('cate');
        getCate(cate).then(x =>{

            if(!x.error){
                x.map( box => {
                    qs('#rankItem').innerHTML += `
                    <li>
                        <span>${box.categoryName} 랜덤박스</span>
                        <a href="/detail/${box.randomboxId}">
                            <img src="../../assets/randombox.gif" />
                        </a>
                        <span>${box.randomboxName}</span>
                    </li>`
                })
            }else{
                qs('#rankItem').innerHTML += `
                    <li>
                        <h1>랜덤박스가 없습니다 !!</h1>
                    </li>`
            }
        });
    }
}