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
                            <img src="https://cdn.dribbble.com/users/948184/screenshots/3787246/media/d67be67672960bffb78a6309af936540.gif" />
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
