import Component from "../../core/Component.js";
import {insertQna, updateQna} from "../../apis/qna.js";
import { qs } from "../../utils/index.js";
import {getQnaDetail} from "../../apis/qna.js";
import style from "./QnaView.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export default class QnaView extends Component {
    template() {
        return `
            <div id="qnaView"></div>
           
            <div class="qnaview-control">
                <a href="/qnaboard/list">글목록</a>
                <button  id="modify">글수정</button>
                <button  id="update" style="display: none">수정하기</button>
            </div>
            `
    }

    setEvent() {
        window.addEventListener('load',function(){
            const urlParams = new URL(location.href).searchParams;
            const qnaboardId = urlParams.get('qnaboardId');
            const password = prompt("비밀번호를 입력해 주세요");
            if(password){
                getQnaDetail(qnaboardId,password).then(x =>
                    {
                        if(x.error){
                            alert(x.error);
                            location.href = "/qnaboard/list";

                        }else{
                            qs("#qnaView").innerHTML += `
                             <table class="qnaview-table">
                                <thead>
                                    <tr>
                                        <th>${x._doc.title}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><span>작성자 : ${x._doc.author}</span><span>작성날짜 :${x._doc.createdAt.slice(0,10)}</span></td>
                                    </tr>
                                    <tr>
                                        <td class="qnaview-area">${x._doc.content}</td>
                                    </tr>
                                </tbody>
                            </table>
                            `
                            qs("#modify").addEventListener('click',()=>{
                                if(confirm("글을 수정하시겠습니까?")){
                                qs("#qnaView").innerHTML = `                                    
                                     <table class="qnaview-table">
                                        <thead>
                                            <tr>
                                                <th>제목:<input type="text" value="${x._doc.title}" id="title"/></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><span>작성자 : ${x._doc.author}</span><span>작성날짜 :${x._doc.createdAt.slice(0,10)}</span></td>
                                            </tr>
                                            <tr>
                                           
                                                <td class="qnaview-area">내용: <textarea id="content" cols="30" rows="5">${x._doc.content}</textarea></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                `
                                    qs("#modify").style.display = 'none';
                                    qs("#update").style.display = 'block';
                                }
                            })

                            qs("#update").addEventListener('click',()=>{
                                if(confirm("글을 수정하시겠습니까?")) {
                                    const formData = new FormData();
                                    const title = qs("#title").value;
                                    const content = qs("#content").value;
                                    formData.append("title", title);
                                    formData.append("content", content);
                                    updateQna(formData,x.qnaboardId).then(x =>{
                                        if (x.status === 200){
                                            alert("수정이 완료 되었습니다.");
                                            window.location.href = "/qnaboard/list";
                                        }else{
                                            alert("수정실패");
                                            return false;
                                        }
                                    })

                                    if(title !== "" && content !==  ""){
                                        console.log('test',title,content);
                                    }else{
                                        alert("값을 모두 입력해 주세요");
                                        return false;
                                    }
                                }
                            })
                        }
                    }
                );
            }else{
                alert('권한이 없습니다');
                return false;
            }
        });
    }
}