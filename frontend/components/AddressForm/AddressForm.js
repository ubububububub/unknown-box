import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";

class AddressForm extends Component {
  template() {
    return `<input type="text" id="postcode" placeholder="우편번호">
            <input type="button" class="address" value="우편번호 찾기"><br>
            <input type="text" id="roadAddress" placeholder="도로명주소">
            <input type="text" id="jibunAddress" placeholder="지번주소">
            <span id="guide" style="color:#999;display:none"></span>
            <input type="text" id="detailAddress" placeholder="상세주소">
            <input type="text" id="extraAddress" placeholder="참고항목">
    `;
  }

  setEvent() {
    function execDaumPostcode() {
      new daum.Postcode({
        oncomplete(data) {
          const roadAddr = data.roadAddress;
          let extraRoadAddr = "";

          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname;
          }

          if (data.buildingName !== "" && data.apartment === "Y") {
            extraRoadAddr +=
              extraRoadAddr !== ""
                ? ", " + data.buildingName
                : data.buildingName;
          }

          if (extraRoadAddr !== "") {
            extraRoadAddr = " (" + extraRoadAddr + ")";
          }

          qs("#postcode").value = data.zonecode;
          qs("#roadAddress").value = roadAddr;
          qs("#jibunAddress").value = data.jibunAddress;

          if (roadAddr !== "") {
            qs("#extraAddress").value = extraRoadAddr;
          } else {
            qs("#extraAddress").value = "";
          }

          const guideTextBox = qs("#guide");
          if (data.autoRoadAddress) {
            const expRoadAddr = data.autoRoadAddress + extraRoadAddr;
            guideTextBox.innerHTML = "(예상 도로명 주소 : " + expRoadAddr + ")";
            guideTextBox.style.display = "block";
          } else if (data.autoJibunAddress) {
            const expJibunAddr = data.autoJibunAddress;
            guideTextBox.innerHTML = "(예상 지번 주소 : " + expJibunAddr + ")";
            guideTextBox.style.display = "block";
          } else {
            guideTextBox.innerHTML = "";
            guideTextBox.style.display = "none";
          }
        }
      }).open();
    }

    qs(".address").addEventListener("click", execDaumPostcode);
  }
}

export default AddressForm;
