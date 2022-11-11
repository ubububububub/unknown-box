import Component from "../../core/Component.js";
import { getQnaList } from "../../apis/qna.js";
import QnaItem from "../QnaItem/QnaItem.js";
import { qs } from "../../utils/index.js";
import style from "./QnaList.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export default class QnaList extends Component {
  template() {
    return `
            <table class="qnalist-table">
                <thead>
                    <tr>
                        <th>글번호 </th>
                        <th>제목 </th>
                        <th>작성자 ✏️</th>
                        <th>작성일 🗓️</th>
                    </tr>
                </thead>
                <tbody id="qna-list-body"></tbody>
                
            </table>
            <div class="qna-list-paging">
                <span id="paging"></span>
            </div>
            <a href="/qnaboard/write" class="qnalist-btn">글쓰기</a>
            `
  }

  mounted() {
    getQnaList().then(list => {
      const pagingCount = 7;
      list.reverse();
      for (let i = 0; i <= (list.length / pagingCount +1); i++) {
        console.log(i);
        if (i !== 0){
          qs('#paging').innerHTML += `<input type="button" value=${i}></input>`;
        }
      }
      list.push([{startPage:0,endPage:6,boardNum:list.length}])
      qs("#paging").addEventListener('click',(e) =>{
        if(e.target.value){
          qs("#qna-list-body").innerHTML = "";
          list[list.length - 1][0].startPage = (e.target.value * pagingCount) - pagingCount;
          list[list.length - 1][0].endPage =  (e.target.value * pagingCount) - 1 ;
          for(let i = list[list.length - 1][0].startPage; i <= list[list.length - 1][0].endPage; i++){
            list[i].boardNum = (list.length - i);
            new  QnaItem(qs("#qna-list-body"), list[i]);
          }
        }
      })
      for(let i = list[list.length - 1][0].startPage; i <= list[list.length - 1][0].endPage; i++){
        list[i].boardNum = (list.length - i);
        new QnaItem(qs("#qna-list-body"), list[i]);
      }
    })
  }
}