export async function postSignIn(data) {
  try {
    await fetch("http://localhost:8080/api/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  } catch (err) {
    console.dir(err);
  }
}

export async function postLogin(data) {
  try {
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    localStorage.setItem("role", json.role);
  } catch (err) {
    console.dir(err);
  }
}

export async function getMyOrder() {
  try {
    const response = await fetch(`http://localhost:8080/api/order`, {
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

export async function getOrderInfo(orderId) {
  try {
    const response = await fetch(`http://localhost:8080/api/order/${orderId}`, {
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

export async function postOrderInfo(data, orderId) {
  try {
    await fetch(`http://localhost:8080/api/order/${orderId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  } catch (err) {
    console.dir(err);
  }
}

export async function deleteOrderInfo(orderId) {
  try {
    await fetch(`http://localhost:8080/api/order/${orderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  } catch (err) {
    console.dir(err);
  }
}

export async function postOrder(data) {
  try {
    await fetch("http://localhost:8080/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  } catch (err) {
    console.dir(err);
  }
}

export async function getKakaoLoginToken(email) {
  try {
    const res = await fetch("http://localhost:8080/api/auth/kakao/tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });
    return await res.json();
  } catch (err) {
    console.dir(err);
  }
}
