import Component from "../../core/Component.js";
import style from "./RankList.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export default class RankList extends Component {
    template() {
        const urlParams = new URL(location.href).searchParams;
        const cate = urlParams.get('cate');
        return `
            <h1>${cate}랜덤 박스</h1>
            <ul class="rank-list">
                <li>
                    <a href="/rank?cate=${cate}">
                        <img src="https://cdn.dribbble.com/users/948184/screenshots/3787246/media/d67be67672960bffb78a6309af936540.gif" />
                    </a>
                    <span>${cate}_<strong>아이언</strong></span>
                </li>
                <li>
                    <a href="/rank?cate=${cate}">
                     <img src="https://cdn.dribbble.com/users/948184/screenshots/3787246/media/d67be67672960bffb78a6309af936540.gif" />
                    </a>
                    <span>${cate}_<strong>골드</strong></span>
                </li>
                <li>
                    <a href="/rank?cate=${cate}">
                        <img src="https://cdn.dribbble.com/users/948184/screenshots/3787246/media/d67be67672960bffb78a6309af936540.gif" />
                    </a>
                    <span>${cate}_<strong>플레티넘</strong></span>
                </li>
                <li>
                    <a href="/rank?cate=${cate}">
                        <img src="https://cdn.dribbble.com/users/948184/screenshots/3787246/media/d67be67672960bffb78a6309af936540.gif" />
                    </a>
                    <span>${cate}_<strong>마스터</strong></span>
                </li>
                <li>
                     <a href="/rank?cate=${cate}">
                        <img src="https://cdn.dribbble.com/users/948184/screenshots/3787246/media/d67be67672960bffb78a6309af936540.gif" />
                    </a>
                    <span>${cate}_<strong>챌린저</strong></span>
                </li>
                <ul/>`
                ;
    }


}
