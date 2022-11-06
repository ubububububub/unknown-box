export async function getList() {
  try {
    const response = await fetch("http://localhost:8080/api/product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return await response.json();
  } catch (err) {
    console.dir(err);
  }
}

export async function getItem(id) {
  try {
    const response = await fetch(`http://localhost:8080/api/product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return await response.json();
  } catch (err) {
    console.dir(err);
  }
}

export async function getKakaoProfile(accessToken) {
  try {
    const response = await fetch("https://kapi.kakao.com/v2/user/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: `Bearer ${accessToken}`
      }
    });
    const { kakao_account } = await response.json();
    const {
      email,
      profile: { nickname }
    } = kakao_account;

    return { email, nickname };
  } catch (err) {
    console.dir(err);
  }
}
