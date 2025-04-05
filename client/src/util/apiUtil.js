function makeOption(httpMethod, body) {
    const option = {
        method: httpMethod.toUpperCase(),
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        }
    }
    if (body) {
        option.body = JSON.stringify(body);
    }
    return option;
}



async function checkForHttpErrors(response) {
    if (!response.ok) {
        let errorResponse = await response.json();
        let error = new Error("status: " + response.status + "\nMessage: " + errorResponse.message);
        error.apiError = errorResponse;
        throw error;
    }
}



export {
    makeOption,
    checkForHttpErrors
}