import Component from "../../core/Component.js";
import { qs, isClassContained, MODAL } from "../../utils/index.js";
import {
  deleteAdminQna,
  getAdminQnaDetail,
  getAdminQnaList,
  postAdminQna
} from "../../apis/index.js";
import Navbar from "../../components/Navbar/Navbar.js";
import { ADMIN_PAGE_NAV } from "../../constants/index.js";
import Modal from "../../components/Modal/Modal.js";
import style from "./adminQna.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export class AdminQna extends Component {
  async setup() {
    const qnaList = await getAdminQnaList();
    this.state = { qnaList };
  }
  template() {
    return `
          <section id="admin_qna-container">
            <div id="admin_qna-nav"></div>
            <table id="admin_qna-list-wrapper">
            <thead>
                <tr>
                    <th>글번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>수정일</th>
                </tr>
            </thead>
            <tbody id="admin_qna-list-body">
            ${this.state.qnaList
              .map(
                qna =>
                  `<tr class="qna" data-id="${qna.qnaboardId}">
                    <td>${qna.qnaboardId}</td>
                    <td>${qna.title}</td>
                    <td>${qna.author}</td>
                    <td>${qna.createdAt.slice(0, 10)}</td>
                    <td>${qna.updatedAt.slice(0, 10)}</td>
                    <td>
                      <button type="button" class="qna-btn admin_getDetail-qna">게시글 보기</button>
                      <button type="button" class="qna-btn admin_del-qna">게시글 삭제</button>
                      </td>
                </tr>`
              )
              .join("")}
            </tbody>
          </table>
        </section>
        `;
  }

  async mounted() {
    new Navbar(qs("#admin_qna-nav"), ADMIN_PAGE_NAV);
  }

  setEvent() {
    this.target.addEventListener("click", e => {
      if (!isClassContained(e.target, "qna-btn")) return;

      const qnaId = e.target.closest("tr").dataset.id;
      if (isClassContained(e.target, "admin_getDetail-qna")) {
        this.getDetailHandler(qnaId);
      }

      if (isClassContained(e.target, "admin_del-qna")) {
        this.deleteHandler(qnaId);
      }
    });
  }

  async getDetailHandler(qnaId) {
    const qnaDetail = await getAdminQnaDetail(qnaId);
    const { qnaboardId, title, content, author, answer } = qnaDetail;

    new Modal(qs("#app"), {
      id: qnaboardId,
      type: "ANSWER",
      headerText: "QnA",
      contents: {
        body: [
          MODAL.Div({ className: "qna" }, [
            MODAL.Div({ className: "qna-title" }, [
              MODAL.Span({}, ["제목"]),
              MODAL.Span({}, [title])
            ]),
            MODAL.Div({ className: "qna-content" }, [
              MODAL.Span({}, ["내용"]),
              MODAL.Span({}, [content])
            ]),
            MODAL.Div({ className: "qna-quthor" }, [
              MODAL.Span({}, ["작성자"]),
              MODAL.Span({}, [author])
            ]),
            MODAL.Div({ className: "qna-answer" }, [
              MODAL.Span({}, ["답변"]),
              answer == null
                ? MODAL.Div({}, [MODAL.Textarea({}, [])])
                : MODAL.Span({}, [answer])
            ])
          ])
        ]
      },
      submit: this.answerQna
    });
  }

  async answerQna(id, data) {
    await postAdminQna(id, { answer: data });
    location = "/admin/qna";
  }

  async deleteHandler(id) {
    await deleteAdminQna(id);
    const remain = this.state.qnaList.filter(post => post.qnaboardId != id);
    this.setState({ qnaList: remain });
  }
}
