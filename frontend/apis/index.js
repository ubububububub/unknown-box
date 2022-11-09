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
    localStorage.setItem("accessToken", json.accessToken);
    localStorage.setItem("refreshToken", json.refreshToken);
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
        "Content-Type": "application/json",
        "X-Access-Token": localStorage.getItem("accessToken")
      }
    });
    return await response.json();
  } catch (err) {
    if (err.response.status === 403) {
      await postRefreshToken();
      await getMyOrder();
    }
    console.dir(err);
  }
}

export async function getOrderInfo(orderId) {
  try {
    const response = await fetch(`http://localhost:8080/api/order/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": localStorage.getItem("accessToken")
      }
    });
    return await response.json();
  } catch (err) {
    if (err.response.status === 403) {
      await postRefreshToken();
      await getOrderInfo(orderId);
    }
    console.dir(err);
  }
}

export async function postOrderInfo(formData, orderId) {
  try {
    await fetch(`http://localhost:8080/api/order/${orderId}`, {
      method: "POST",
      "X-Access-Token": localStorage.getItem("accessToken"),
      body: formData
    });
  } catch (err) {
    if (err.response.status === 403) {
      await postRefreshToken();
      await postOrderInfo(formData, orderId);
    }
    console.dir(err);
  }
}

export async function deleteOrderInfo(orderId) {
  try {
    await fetch(`http://localhost:8080/api/order/${orderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": localStorage.getItem("accessToken")
      },
      body: JSON.stringify(data)
    });
  } catch (err) {
    if (err.response.status === 403) {
      await postRefreshToken();
      await deleteOrderInfo(orderId);
    }
    console.dir(err);
  }
}

export async function postOrder(data) {
  try {
    await fetch("http://localhost:8080/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": localStorage.getItem("accessToken")
      },
      body: JSON.stringify(data)
    });
  } catch (err) {
    if (err.response.status === 403) {
      await postRefreshToken();
      await postOrder(data);
    }
    console.dir(err);
  }
}

export async function getMyInfo() {
  try {
    const response = await fetch(`http://localhost:8080/api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": localStorage.getItem("accessToken")
      }
    });
    return await response.json();
  } catch (err) {
    if (response.status === 403) {
      await postRefreshToken();
      await getMyInfo();
    }
    console.dir(err);
  }
}

export async function postMyPassword(formData) {
  try {
    await fetch(`http://localhost:8080/api/user`, {
      method: "POST",
      body: formData,
      "X-Access-Token": localStorage.getItem("accessToken")
    });
  } catch (err) {
    if (response.status === 403) {
      await postRefreshToken();
      await postMyPassword(formData);
    }
    console.dir(err);
  }
}

export async function postRefreshToken() {
  try {
    const response = await fetch("http://localhost:8080/api/auth", {
      method: "POST",
      headers: {
        "X-Access-Token": localStorage.getItem("accessToken"),
        "X-Refresh-Token": localStorage.getItem("refreshToken")
      }
    });
    const json = await response.json();
    localStorage.setItem("accessToken", json.accessToken);
    localStorage.setItem("refreshToken", json.refreshToken);
  } catch (err) {
    console.dir(err);
  }
}

export async function getRandomBoxProducts() {
  try {
    const response = await fetch("랜덤 박스 상품 api", {
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

export async function postRandomBoxResult(product) {
  try {
    await fetch("랜덤 박스 결과 api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ product })
    });
  } catch (err) {
    console.dir(err);
  }
}

export async function postKakaoLoginToken(email) {
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

export async function postPayment(formData, orderId, product) {
  try {
    await fetch(`http://localhost:8080/api/order/${orderId}`, {
      method: "POST",
      "X-Access-Token": localStorage.getItem("accessToken"),
      body: JSON.stringify({ ...formData, ...product })
    });
  } catch (err) {
    if (err.response.status === 403) {
      await postRefreshToken();
      await postPayment(formData, orderId, product);
    }
  }
}

export async function getCategoryList() {
  try {
    const response = await fetch("http://localhost:8080/api/admin/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.json();
  } catch (err) {
    console.dir(err);
  }
}

export async function addCategory(data) {
  try {
    const response = await fetch(`http://localhost:8080/api/admin/category`, {
      method: "POST",
      body: data
    });
    return response.json();
  } catch (err) {
    console.dir(err);
  }
}

export async function editCategory(id, data) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/admin/category/${id}`,
      {
        method: "PUT",
        body: data
      }
    );
    return response.json();
  } catch (err) {
    console.dir(err);
  }
}

export async function deleteCategory(id) {
  try {
    await fetch(`http://localhost:8080/api/admin/category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (err) {
    console.dir(err);
  }
}

export async function getProductList() {
  try {
    const response = await fetch("http://localhost:8080/api/admin/product", {
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

export async function addProduct(data) {
  try {
    await fetch(`http://localhost:8080/api/admin/product`, {
      method: "POST",

      body: data
    });
  } catch (err) {
    console.dir(err);
  }
}

export async function getProductDetail(id) {
  try {
    const response = await fetch(`http://localhost:8080/api/product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.json();
  } catch (err) {
    console.dir(err);
  }
}

export async function editProduct(id, data) {
  try {
    await fetch(`http://localhost:8080/api/admin/product/${id}`, {
      method: "PUT",
      body: data
    });
  } catch (err) {
    console.dir(err);
  }
}

export async function deleteProduct(id) {
  try {
    await fetch(`http://localhost:8080/api/admin/product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (err) {
    console.dir(err);
  }
}

export async function getOrderList() {
  try {
    const response = await fetch(`http://localhost:8080/api/admin/order`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.json();
  } catch (err) {
    console.dir(err);
  }
}

export async function getOrderDetail(id) {
  try {
    const response = await fetch(`http://localhost:8080/api/order/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.json();
  } catch (err) {
    console.dir(err);
  }
}

export async function editOrder(id, data) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/admin/order/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );
    return response.json();
  } catch (err) {
    console.dir(err);
  }
}

export async function deleteOrder(id) {
  try {
    await fetch(`http://localhost:8080/api/admin/order/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (err) {
    console.dir(err);
  }
}
