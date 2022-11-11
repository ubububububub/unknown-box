import { getCate } from "../../apis/main.js";
import Component from "../../core/Component.js";
import style from "./RankList.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export default class RankList extends Component {
    template() {
        const urlParams = new URL(location.href).searchParams;
        const cate = urlParams.get('cate');
        const result = [];
        getCate(cate).then(x =>{
            /*if(x.error){
                alert(x.error); window.history.back();
            }*/
            console.log(x);
            result.push(x.error);
        });
        console.log(result);
        return `
            <h1>${cate}랜덤 박스</h1>
            <ul class="rank-list">
                <li>
                    <a href="/detail/${cate}">
                        <img src="https://cdn.dribbble.com/users/948184/screenshots/3787246/media/d67be67672960bffb78a6309af936540.gif" />
                    </a>
                    <span>${cate}_<strong>아이언</strong></span>
                </li>
            <ul/>`;
    }


}
