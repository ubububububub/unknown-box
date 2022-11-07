export async function postSignIn(formData) {
  try {
    await fetch("http://localhost:8080/api/join", {
      method: "POST",
      body: formData
    });
  } catch (err) {
    console.dir(err);
  }
}

export async function postLogin(formData) {
  try {
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      body: formData
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

export async function postOrderInfo(formData, orderId) {
  try {
    await fetch(`http://localhost:8080/api/order/${orderId}`, {
      method: "POST",
      body: formData
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

export async function getMyInfo() {
  try {
    const response = await fetch(`http://localhost:8080/api/user`, {
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

export async function postMyPassword(formData) {
  try {
    await fetch(`http://localhost:8080/api/user`, {
      method: "POST",
      body: formData
    });
  } catch (err) {
    console.dir(err);
  }
}
