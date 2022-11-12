const BASE_URL = process.env.JS_APP_SERVER_API_KEY;

export async function postSignIn(formData) {
  try {
    await fetch("http://localhost:5001/api/join", {
      method: "POST",
      body: formData
    });
    window.location = "/login";
  } catch (err) {
    console.dir(err);
  }
}

export async function postLogin(formData) {
  try {
    const response = await fetch("http://localhost:5001/api/login", {
      method: "POST",
      body: formData
    });
    if (response.status !== 200) {
      throw new Error("가입된 회원 아이디가 아니거나 비밀번호가 틀립니다.");
    } else {
      const json = await response.json();
      localStorage.setItem("accessToken", json.accessToken);
      localStorage.setItem("refreshToken", json.refreshToken);
      localStorage.setItem("role", json.role);
      window.location = "/";
    }
  } catch (err) {
    return err;
  }
}

export async function getMyOrder() {
  try {
    const response = await fetch(`http://localhost:5001/api/order`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": localStorage.getItem("accessToken")
      }
    });
    if (response.status === 403) {
      await postRefreshToken();
      await getMyOrder();
    }
    return await response.json();
  } catch (err) {
    console.dir(err);
  }
}

export async function getOrderInfo(orderId) {
  try {
    const response = await fetch(`http://localhost:5001/api/order/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": localStorage.getItem("accessToken")
      }
    });
    if (response.status === 403) {
      await postRefreshToken();
      await getOrderInfo(orderId);
    }
    return await response.json();
  } catch (err) {
    console.dir(err);
  }
}

export async function putOrderInfo(formData, orderId) {
  try {
    const response = await fetch(`http://localhost:5001/api/order/${orderId}`, {
      method: "PUT",
      headers: {
        "X-Access-Token": localStorage.getItem("accessToken")
      },
      body: formData
    });
    if (response.status === 403) {
      await postRefreshToken();
      await putOrderInfo(formData, orderId);
    }
  } catch (err) {
    console.dir(err);
  }
}

export async function deleteOrderInfo(orderId) {
  try {
    const response = await fetch(`http://localhost:5001/api/order/${orderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": localStorage.getItem("accessToken")
      }
    });
    if (response.status === 403) {
      await postRefreshToken();
      await deleteOrderInfo(orderId);
    }
  } catch (err) {
    console.dir(err);
  }
}

export async function postOrder(data) {
  try {
    const response = await fetch("http://localhost:5001/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": localStorage.getItem("accessToken")
      },
      body: JSON.stringify(data)
    });
    if (response.status === 403) {
      await postRefreshToken();
      await postOrder(data);
    }
  } catch (err) {
    console.dir(err);
  }
}

export async function getMyInfo() {
  try {
    const response = await fetch(`http://localhost:5001/api/mypage`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": localStorage.getItem("accessToken")
      }
    });
    if (response.status === 403) {
      await postRefreshToken();
      await getMyInfo();
    }
    return await response.json();
  } catch (err) {
    console.dir(err);
  }
}

export async function putMyPassword(formData) {
  try {
    const response = await fetch(`http://localhost:5001/api/mypage`, {
      method: "PUT",
      headers: {
        "X-Access-Token": localStorage.getItem("accessToken")
      },
      body: formData
    });
    if (response.status === 403) {
      await postRefreshToken();
      await putMyPassword(formData);
    }
    if (response.status === 200) {
      location.reload();
    } else {
      throw new Error("현재 비밀번호가 틀렸습니다.");
    }
  } catch (err) {
    return err;
  }
}

export async function postRefreshToken() {
  try {
    const response = await fetch("http://localhost:5001/api/auth", {
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

export async function getRandomBoxProducts(randomboxId) {
  try {
    const response = await fetch(
      `http://localhost:5001/api/randombox/${randomboxId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return await response.json();
  } catch (err) {
    console.dir(err);
  }
}

export async function putRandomBoxResult({ randomboxId, orderId, productId }) {
  try {
    const response = await fetch(
      `http://localhost:5001/api/randombox/${randomboxId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": localStorage.getItem("accessToken")
        },
        body: JSON.stringify({ orderId, productId })
      }
    );
    if (response.status === 403) {
      await postRefreshToken();
      await putRandomBoxResult(randomboxId, orderId, productId);
    }
  } catch (err) {
    console.dir(err);
  }
}

export async function postKakaoLoginToken(email) {
  try {
    const res = await fetch("http://localhost:5001/api/auth/kakao/tokens", {
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

export async function postPayment(formData, product) {
  try {
    const response = await fetch(`http://localhost:5001/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": localStorage.getItem("accessToken")
      },
      body: JSON.stringify({ formData: [...formData], product })
    });
    if (response.status === 403) {
      await postRefreshToken();
      await postPayment(formData, product);
    }
  } catch (err) {
    console.dir(err);
  }
}

export async function getCategoryList() {
  try {
    const response = await fetch("http://localhost:5001/api/admin/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": localStorage.getItem("accessToken")
      }
    });
    if (response.status === 403) {
      await postRefreshToken();
      await getCategoryList();
    }
    return await response.json();
  } catch (err) {
    console.dir(err);
  }
}

export async function addCategory(data) {
  try {
    await fetch(`http://localhost:5001/api/admin/category`, {
      method: "POST",
      headers: {
        "X-Access-Token": localStorage.getItem("accessToken")
      },
      body: data
    });
  } catch (err) {
    console.dir(err);
  }
}

export async function editCategory(id, data) {
  try {
    const response = await fetch(
      `http://localhost:5001/api/admin/category/${id}`,
      {
        method: "PUT",
        headers: {
          "X-Access-Token": localStorage.getItem("accessToken")
        },
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
    const response = await fetch(
      `http://localhost:5001/api/admin/category/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": localStorage.getItem("accessToken")
        }
      }
    );
    if (response.status === 403) {
      await postRefreshToken();
      await deleteCategory(id);
    }
  } catch (err) {
    console.dir(err);
  }
}

export async function getBoxList() {
  try {
    const response = await fetch("http://localhost:5001/api/admin/randombox", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": localStorage.getItem("accessToken")
      }
    });
    if (response.status === 403) {
      await postRefreshToken();
      await getBoxList();
    }
    return await response.json();
  } catch (err) {
    console.dir(err);
  }
}

export async function addBox(data) {
  try {
    await fetch(`http://localhost:5001/api/admin/randombox`, {
      method: "POST",
      headers: {
        "X-Access-Token": localStorage.getItem("accessToken")
      },
      body: data
    });
  } catch (err) {
    console.dir(err);
  }
}

export async function getBoxDetail(id) {
  try {
    const response = await fetch(`http://localhost:5001/api/randombox/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": localStorage.getItem("accessToken")
      }
    });
    if (response.status === 403) {
      await postRefreshToken();
      await getBoxDetail(id);
    }
    return response.json();
  } catch (err) {
    console.dir(err);
  }
}

export async function editBox(id, data) {
  try {
    const response = await fetch(
      `http://localhost:5001/api/admin/randombox/${id}`,
      {
        method: "PUT",
        headers: {
          "X-Access-Token": localStorage.getItem("accessToken")
        },
        body: data
      }
    );
    return response.json();
  } catch (err) {
    console.dir(err);
  }
}

export async function deleteBox(id) {
  try {
    const response = await fetch(
      `http://localhost:5001/api/admin/randombox/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": localStorage.getItem("accessToken")
        }
      }
    );
    if (response.status === 403) {
      await postRefreshToken();
      await deletebox(id);
    }
  } catch (err) {
    console.dir(err);
  }
}

export async function getProductList() {
  try {
    const response = await fetch("http://localhost:5001/api/admin/product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": localStorage.getItem("accessToken")
      }
    });
    if (response.status === 403) {
      await postRefreshToken();
      await getProductList();
    }
    return await response.json();
  } catch (err) {
    console.dir(err);
  }
}

export async function addProduct(data) {
  try {
    const res = await fetch(`http://localhost:5001/api/admin/product`, {
      method: "POST",
      headers: {
        "X-Access-Token": localStorage.getItem("accessToken")
      },
      body: data
    });
    console.log("res", res);
  } catch (err) {
    console.dir(err);
  }
}

export async function getProductDetail(id) {
  try {
    const response = await fetch(
      `http://localhost:5001/api/admin/product/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": localStorage.getItem("accessToken")
        }
      }
    );
    if (response.status === 403) {
      await postRefreshToken();
      await getProductDetail(id);
    }
    return response.json();
  } catch (err) {
    console.dir(err);
  }
}

export async function editProduct(id, data) {
  try {
    await fetch(`http://localhost:5001/api/admin/product/${id}`, {
      method: "PUT",
      headers: {
        "X-Access-Token": localStorage.getItem("accessToken")
      },
      body: data
    });
  } catch (err) {
    console.dir(err);
  }
}

export async function deleteProduct(id) {
  try {
    const response = await fetch(
      `http://localhost:5001/api/admin/product/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": localStorage.getItem("accessToken")
        }
      }
    );
    if (response.status === 403) {
      await postRefreshToken();
      await deleteProduct(id);
    }
  } catch (err) {
    console.dir(err);
  }
}

export async function getOrderList() {
  try {
    const response = await fetch(`http://localhost:5001/api/admin/order`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": localStorage.getItem("accessToken")
      }
    });
    if (response.status === 403) {
      await postRefreshToken();
      await getOrderList();
    }
    return response.json();
  } catch (err) {
    console.dir(err);
  }
}

export async function getOrderDetail(id) {
  try {
    const response = await fetch(
      `http://localhost:5001/api/admin/order/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": localStorage.getItem("accessToken")
        }
      }
    );
    if (response.status === 403) {
      await postRefreshToken();
      await getOrderDetail(id);
    }
    return response.json();
  } catch (err) {
    console.dir(err);
  }
}

export async function editOrder(id, data) {
  try {
    const response = await fetch(
      `http://localhost:5001/api/admin/order/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": localStorage.getItem("accessToken")
        },
        body: JSON.stringify(data)
      }
    );
    if (response.status === 403) {
      await postRefreshToken();
      await editOrder(id, data);
    }
  } catch (err) {
    console.dir(err);
  }
}

export async function deleteOrder(id) {
  try {
    const response = await fetch(
      `http://localhost:5001/api/admin/order/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": localStorage.getItem("accessToken")
        }
      }
    );
    if (response.status === 403) {
      await postRefreshToken();
      await deleteOrder(id);
    }
  } catch (err) {
    console.dir(err);
  }
}

export async function getAdminQnaList() {
  try {
    const response = await fetch(`http://localhost:5001/api/admin/qnaboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": localStorage.getItem("accessToken")
      }
    });

    return response.json();
  } catch (err) {
    console.dir(err);
  }
}

export async function getAdminQnaDetail(id) {
  try {
    const response = await fetch(
      `http://localhost:5001/api/admin/qnaboard/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": localStorage.getItem("accessToken")
        }
      }
    );
    if (response.status === 403) {
      await postRefreshToken();
      await getAdminQnaDetail(id);
    }
    return await response.json();
  } catch (err) {
    console.dir(err);
  }
}

export async function postAdminQna(id, data) {
  try {
    const response = await fetch(
      `http://localhost:5001/api/admin/qnaboard/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": localStorage.getItem("accessToken")
        },
        body: JSON.stringify(data)
      }
    );
    if (response.status === 403) {
      await postRefreshToken();
      await postAdminQna(id, data);
    }
    return await response.json();
  } catch (err) {
    console.dir(err);
  }
}

export async function deleteAdminQna(id) {
  try {
    const response = await fetch(
      `http://localhost:5001/api/admin/qnaboard/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": localStorage.getItem("accessToken")
        }
      }
    );
    if (response.status === 403) {
      await postRefreshToken();
      await deleteAdminQna(id);
    }
  } catch (err) {
    console.dir(err);
  }
}

export async function postEmailConfirmSend(email) {
  try {
    const response = await fetch("http://localhost:5001/api/auth/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });
    return await response.json();
  } catch (err) {
    console.dir(err);
  }
}

export async function getEmailConfirmVerified(email, mailnum) {
  try {
    const response = await fetch(`http://localhost:5001/api/auth/mailnum`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-email": email,
        "x-mail-num": mailnum
      }
    });
    return await response.json();
  } catch (err) {
    console.dir(err);
  }
}

export async function getUserInfo() {
  try {
    const res = await fetch(`http://localhost:5001/api/order/userinfo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": localStorage.getItem("accessToken")
      }
    });
    return res.json();
  } catch (err) {
    console.dir(err);
  }
}
