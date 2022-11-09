import Component from "../../core/Component.js";
import QnaItem from "../QnaItem/QnaItem.js";
import { qs } from "../../utils/index.js";

export default class QnaList extends Component {
    template() {
        return `
            <thead>
                <tr>
                    <th>글번호</th>
                    <th>제목</th>
                    <th>내용</th>
                    <th>작성자</th>
                </tr>
            </thead>
             <tbody id="qna-list-body"></tbody>
            <a href="/qnaboard/write" class="btn btn-primary float-left">글쓰기</a>
            </table>
            <span id="paging"></span>
            `

    }

    mounted() {
        const pagingCount = 10;
        const list = []
        for(let i = 1; i <= 70; i++){
            list.push(
                {
                    boardNum: i,
                    title: "글번호 "+i,
                    content: "1000",
                    write: "작성자 "+i
                }
            )
        }

        for (let i = 1; i <= (list.length / pagingCount); i++) {
            if (i !== 0){
                qs('#paging').innerHTML += `<input type="button" value=${i}></input>`;
            }
        }
        list.push([{startPage:0,endPage:9}])

        qs("#paging").addEventListener('click',(e) =>{
            qs("#qna-list-body").innerHTML = "";
            list[list.length - 1][0].startPage = (e.target.value * pagingCount) - pagingCount;
            list[list.length - 1][0].endPage =  (e.target.value * pagingCount) - 1 ;
            for(let i = list[list.length - 1][0].startPage; i <= list[list.length - 1][0].endPage; i++){
                new  QnaItem(qs("#qna-list-body"), list[i]);
            }
        })

        for(let i = list[list.length - 1][0].startPage; i <= list[list.length - 1][0].endPage; i++){
            new QnaItem(qs("#qna-list-body"), list[i]);
        }
    }



}