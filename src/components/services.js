function get(url) {
    const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });
    return fetch(url, {
        method: 'GET',
        headers: headers
    }).then(response => {
        return handleResponse(url, response);
    }).catch(err => {
        throw err;
    })
}

function handleResponse(url, response) {
    if (response.status < 500) {
        return response.json();
    } else {
        console.error(`Request failed. Url = ${url} . Message = ${response.statusText}`);
        throw new Error("Request failed due to server error")
    }
}

export default {
    get
}