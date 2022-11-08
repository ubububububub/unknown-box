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
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return response.json();
  } catch (err) {
    console.dir(err);
  }
}

export async function editCategory(id) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/admin/category/${id}`,
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
