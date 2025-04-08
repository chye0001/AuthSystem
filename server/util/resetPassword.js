function getUniqueRestPasswordId(length = 16) {
    const randomBytes = new Uint8Array(length); // length 16 industry standard give 2^128 possible results, low chance of collision
    crypto.getRandomValues(randomBytes);

    const uniqueRestPasswordId = Array.from(randomBytes, (byte) => byte.toString(16)).join(""); // used base 16 which is for hexadicimal, usaly used for ids?
                                                                                                // also we use pad to ensure the length of the return value is consitent
    return uniqueRestPasswordId;
}



function getResetLink(uniqueRestPasswordId) {
    return `http://localhost:5173/restpassword/${uniqueRestPasswordId}`; // dev link
}

export { getUniqueRestPasswordId, getResetLink }