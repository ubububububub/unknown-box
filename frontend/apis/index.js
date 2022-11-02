export async function postSignIn(data) {
  try {
    const response = await fetch("http://localhost:8080/api/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => response.json());
  } catch (err) {
    console.dir(err);
  }
}
