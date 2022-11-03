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

export async function getLogout() {
  try {
    await fetch("http://localhost:8080/api/logout").then(() => {
      function deleteCookie(token) {
        document.cookie = token + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      }
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
    });
  } catch (err) {
    console.dir(err);
  }
}
