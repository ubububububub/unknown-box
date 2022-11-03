import Component from "../../core/Component.js";

export default class ProductItem extends Component {
    
    template () {
        const { productId, productName, price, desc } = this.props;
        return `
            <tr id="product-item">
                <td>${productId}</td>
                <td>${productName}</td>
                <td>${price}</td>
                <td>${desc}</td>
            </tr>
            <button type="button">수정하기</button>
            <button type="button">삭제하기</button>
        `;
    }

    render () {
        this.target.insertAdjacentHTML('beforeend', this.template());
    }
}