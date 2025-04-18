function makeOption(httpMethod, body) {

    const httpMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"];
    if (!httpMethods.includes(httpMethod.toUpperCase())) {
        console.log("Incorrect http method");
        throw Error();
    }

    const option = {
        method: httpMethod.toUpperCase(),
        credentials: 'include',
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
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
        let error = new Error(errorResponse.errorMessage);
        throw error;
    }
}



export {
    makeOption,
    checkForHttpErrors
}