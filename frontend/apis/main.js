import { BASE_URL } from "../constants/url.js";

export async function getList() {
  try {
    const response = await fetch(`${BASE_URL}/api/product`, {
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
    const response = await fetch(`${BASE_URL}/api/main`, {
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
    const response = await fetch(`${BASE_URL}/api/randombox/${id}`, {
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
    const response = await fetch(`${BASE_URL}/api/category/${id}/randombox`, {
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
