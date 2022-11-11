export async function insertQna(formData) {
    try {
        const response = await fetch(`http://localhost:8080/api/qnaboard/`, {
            method: "POST",
            body: formData,
            headers: {
                "X-Access-Token": localStorage.getItem("accessToken")
            }
        });
        return response;
    } catch (err) {
        console.dir(err);
    }
}

export async function updateQna(formData,id) {
    try {
        const response = await fetch(`http://localhost:8080/api/qnaboard/${id}`, {
            method: "PUT",
            body: formData,
            headers: {
                "X-Access-Token": localStorage.getItem("accessToken")
            }
        });
        return response;
    } catch (err) {
        console.dir(err);
    }
}

export async function deleteQna(formData,id) {
    try {
        console.log(formData);
        const response = await fetch(`http://localhost:8080/api/qnaboard/${id}`, {
            method: "DELETE",
            body: formData,
            headers: {
                "X-Access-Token": localStorage.getItem("accessToken")
            }
        });
        console.log(response);
        return response;
    } catch (err) {
        console.dir(err);
    }
}



export  async function getQnaList() {
    try {
        const response = await fetch("http://localhost:8080/api/qnaboard", {
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


export  async function getQnaDetail(id,password) {
    try {
        password = encodeURI(password);
        const response = await fetch(`http://localhost:8080/api/qnaboard/${id}?password=${password}`, {
            method: "GET",
            headers: {
                "X-Access-Token": localStorage.getItem("accessToken")
            }
        });
        return await response.json();
    } catch (err) {
        console.dir(err);
    }
}