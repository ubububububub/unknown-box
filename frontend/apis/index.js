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
    await fetch("http://localhost:8080/api/login", {
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

export async function getShippingInfo(orderId) {
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

export async function postShippingInfo(data, orderId) {
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
