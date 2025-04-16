import { BASE_URL } from "../../stores/apiStore.js";
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
            data: result.data
        }

    }catch(error) {
        console.error("Sign in error", error);
        console.log(error);
        
        return {
            success: false,
        }
    }
}



async function signUp(baseURL, signUpData) {
    try{
        const postOption = makeOption("POST", signUpData);
        const response = await fetch(baseURL + ENDPOINT_PREFIX + "/signup", postOption);
        
        await checkForHttpErrors(response);

        const result = await response.json();
        return {
            success: true,
            data: result.data
        };

    }catch(error) {
        console.error(error);
        
        return {
            success: false,
            errorMessage: error.message
        };
    }
}



async function signOut(baseURL) {
    try{
        const postOption = makeOption("POST")
        const response = await fetch(baseURL + ENDPOINT_PREFIX + "/signout", postOption);
        await checkForHttpErrors(response);

    }catch(error) {
        console.error(error);
    }
}



async function requestPasswordReset(baseURL, email) {
    try{
        const postOption = makeOption("POST", {email: email});
        const response = await fetch(baseURL + ENDPOINT_PREFIX + "/forgotpassword", postOption);
        await checkForHttpErrors(response);

        const result = await response.json();
        return{
            success: true,
            data: result.data
        };

    }catch(error) {
        console.error(error);
        return {
            success: false,
            errorMessage: error.message
        };
    }
}



async function resetPassword(baseURL, resetToken, newPassword) {
    try{
        const putOption = makeOption("PUT", {resetPasswordId: resetToken, newPassword: newPassword});
        const response = await fetch(baseURL + ENDPOINT_PREFIX + "/resetpassword", putOption);
        await checkForHttpErrors(response);

        const result = await response.json();
        return {
            success: true,
            data: result.data
        };

    }catch(error) {
        console.error(error);
        return {
            success: false,
            errorMessage: error.message
        };
    }
}



export {
    signIn,
    signUp,
    signOut,
    requestPasswordReset,
    resetPassword
}