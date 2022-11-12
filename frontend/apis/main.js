export async function getList() {
  try {
    const response = await fetch(
      "http://kdt-sw3-team11.elicecoding.com/api/product",
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

export async function getMain() {
  try {
    const response = await fetch(
      "http://kdt-sw3-team11.elicecoding.com/api/main",
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

export async function getItem(id) {
  try {
    const response = await fetch(
      `http://kdt-sw3-team11.elicecoding.com/api/randombox/${id}`,
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

export async function getCate(id) {
  try {
    const response = await fetch(
      `http://kdt-sw3-team11.elicecoding.com/api/category/${id}/randombox`,
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
