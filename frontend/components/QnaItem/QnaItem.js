import Component from "../../core/Component.js";

export default class QnaItem extends Component {
    template() {
        const { boardNum, title, content, write } = this.props;
        return `
            <tr onclick="location.href='/qnaboard/'+ ${boardNum} ">
                <td>${boardNum}</td>
                <td>${title}</td>
                <td>${content}</td>
                <td>${write}</td>
            </tr>
        `;
    }

    render() {
        this.target.innerHTML += this.template();
    }
}