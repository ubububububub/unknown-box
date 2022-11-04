export async function getList() {
    try {
    const response = await fetch("http://localhost:8080/api/product", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    return await response.json();
} catch (err) {
    console.dir(err);
}
}


export async function getItem(id) {
try {
    const response = await fetch(`http://localhost:8080/api/product/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
   return await response.json();
} catch (err) {
    console.dir(err);
}
}