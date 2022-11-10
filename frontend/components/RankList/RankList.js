import Component from "../../core/Component.js";
import style from "./RankList.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export default class RankList extends Component {
    template() {
        return `
            <h2>(카테고리명) 랜덤 박스</h2>
            <ul class="rank-list">
                <li>
                    <a href="/category1">
                        <img src="https://cdn.dribbble.com/users/948184/screenshots/3787246/media/d67be67672960bffb78a6309af936540.gif" />
                    </a>
                    <span>아이언</span>
                </li>
                <li>
                    <a href="/category1">
                     <img src="https://cdn.dribbble.com/users/948184/screenshots/3787246/media/d67be67672960bffb78a6309af936540.gif" />
                    </a>
                    <span>골드</span>
                </li>
                <li>
                    <a href="/category1">
                        <img src="https://cdn.dribbble.com/users/948184/screenshots/3787246/media/d67be67672960bffb78a6309af936540.gif" />
                    </a>
                    <span>플레티넘</span>
                </li>
                <li>
                    <a href="/category1">
                        <img src="https://cdn.dribbble.com/users/948184/screenshots/3787246/media/d67be67672960bffb78a6309af936540.gif" />
                    </a>
                    <span>마스터</span>
                </li>
                <li>
                    <a href="/category1">
                        <img src="https://cdn.dribbble.com/users/948184/screenshots/3787246/media/d67be67672960bffb78a6309af936540.gif" />
                    </a>
                    <span>챌린저</span>
                </li>
                <ul/>`
                ;
    }
}
