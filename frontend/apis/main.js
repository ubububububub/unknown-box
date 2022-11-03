export async function getList() {
    try {
        const response = await fetch("http://localhost:8080/api/product", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json());
        return response;
    } catch (err) {
        console.dir(err);
    }
}
