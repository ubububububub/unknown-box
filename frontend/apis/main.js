export async function getList() {
  try {
    const response = await fetch("http://localhost:5001/api/product", {
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

export async function getMain() {
  try {
    const response = await fetch("http://localhost:5001/api/main", {
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
    const response = await fetch(`http://localhost:5001/api/randombox/${id}`, {
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

export async function getCate(id) {
  try {
    const response = await fetch(
      `http://localhost:5001/api/category/${id}/randombox`,
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
