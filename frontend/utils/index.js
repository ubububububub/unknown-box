export function qs(selector) {
  return document.querySelector(selector);
}

export function qsAll(selector) {
  return Array.from(document.querySelectorAll(selector));
}

export function emailValidation(email) {
  const RegExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  if (!email) {
    alert("이메일 주소를 입력해주세요.");
    return false;
  }
  if (!RegExp.test(email)) {
    alert("올바른 이메일 형식이 아닙니다.");
    return false;
  }

  return true;
}

export function passwordValidation(password, passwordConfirm) {
  const RegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

  if (!password) {
    alert("비밀번호를 입력해주세요.");
    return false;
  }
  if (!RegExp.test(password)) {
    alert("비밀번호는 8~16자의 영문자+숫자+특수문자로 입력해주세요.");
    return false;
  }

  return true;
}

export function passwordConfirmValidation(password, passwordConfirm) {
  if (!passwordConfirm) {
    alert("비밀번호 확인을 입력해주세요.");
    return false;
  }
  if (password !== passwordConfirm) {
    alert("비밀번호가 일치하지 않습니다.");
    return false;
  }

  return true;
}

export function nameValidation(name) {
  const RegExp = /^[가-힣]{2,15}$/;

  if (!name) {
    alert("성함를 입력해주세요.");
    return false;
  }
  if (!RegExp.test(name)) {
    alert("올바른 성함을 입력해주세요.");
    return false;
  }

  return true;
}
