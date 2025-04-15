import { checkForHttpErrors, makeOption } from "../../util/apiUtil.js";
//TODO figure out how to implement .env files instead of hardcoded values
const ENDPOINT_PREFIX = "/api/auth";

async function signIn(baseURL, credentials={}) {
    
    try {
        const payload = makeOption("POST", credentials);
        const response = await fetch(baseURL + ENDPOINT_PREFIX + "/signin", payload);
        await checkForHttpErrors(response);
        const result = await response.json();

        return {
            success: true,
            data: result
        }

    }catch(error) {
        console.error("Sign in error", error);
        console.log(error);
        
        return {
            success: false,
        }
    }
}



export {
    signIn
}