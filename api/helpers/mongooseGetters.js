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

/**
 * Weighted rating calculation
 *
 * @param ratings {Array[Number]}
 * **/
module.exports.calculateRating = (ratings) => {
    if (!ratings || ratings.length === 0) {
        return 0;
    }
    let weightedSum = 0;
    let reviewCount = 0;
    ratings.forEach((r, i) => {
        weightedSum += r * (i + 1);
        reviewCount += r;
    });

    return {
        average: weightedSum / ratings.length,
        count: ratings.length
    }
}