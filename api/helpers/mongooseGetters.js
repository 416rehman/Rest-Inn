/** https://mongoosejs.com/docs/tutorials/getters-setters.html **/

/**
 * Obfuscates the email address
 * @param email {String}
 * @return obfuscatedEmail {String}
 */
module.exports.obfuscate = (email) => {
    const separatorIndex = email.indexOf('@');
    if (separatorIndex < 3) {
        // 'ab@gmail.com' -> '**@gmail.com'
        return email.slice(0, separatorIndex).replace(/./g, '*') +
            email.slice(separatorIndex);
    }
    // 'test42@gmail.com' -> 'te****@gmail.com'
    return email.slice(0, 2) +
        email.slice(2, separatorIndex).replace(/./g, '*') +
        email.slice(separatorIndex);
}

module.exports.s3Url = (photos) => {
    return photos.map(photo => `https://restinn.s3.amazonaws.com/${photo}`)
}