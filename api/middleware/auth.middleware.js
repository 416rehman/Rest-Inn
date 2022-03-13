// noinspection ExceptionCaughtLocallyJS

/** Checks for a refresh token in the request header and returns the user if it exists */
const jwt = require("jsonwebtoken");
const User = require("../models/user/user.methods");

/**
 *
 * Makes the endpoint accessible only via a valid REFRESH TOKEN (not access token)
 *
 * Adds a user object with the user's data to the request object
 *
 * @param req
 * @param res
 * @param next
 * @return {Promise<void>}
 */
module.exports.authRefreshToken = async (req, res, next) => {
    try {
        console.log(req.header("Authorization"));
        // Get rid of the 'Bearer ' part of the token
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new Error('A refresh token is required to authenticate this request. Include a refresh token in the Authorization header. (i.e. Authorization: <refresh token>)');
        }
        const decoded = jwt.verify(token, process.env.SECRET);

        User.getByUsername(decoded.username, true, {refresh_token: token}).then(user => {
            if (!user) throw new Error('User not found');
            req.user = user;
            next();
        }).catch(err => {
            throw new Error(err.message || 'Invalid/Revoked refresh token provided');
        });
    } catch (e) {
        res.status(401).send({
            message: 'Failed to authenticate via the provided refresh token',
            error: e.message
        });
    }
};

/**
 * Makes the endpoint accessible only via a valid ACCESS TOKEN (not refresh token)
 *
 * Adds a user object with decoded access_token data to the request object
 *
 * @param role - The role of the user that is required to access this endpoint
 * @return {function(...[*]=)}
 */
module.exports.authAccessToken = (role=null) => {
    return async (req, res, next) => {
        try {
            // Get rid of the 'Bearer ' part of the token
            const token = req.header("Authorization")?.replace("Bearer ", "");

            if (!token)
                throw new Error('An access token is required to authenticate this request. Include an access token in the Authorization header. (i.e. Authorization: <access token>)');

            req.user = jwt.verify(token, process.env.SECRET);
            if (role && req.user.role !== role)
                throw new Error('You do not have the required permissions to access this resource');

            next();
        }
        catch (e) {
            res.status(401).send({
                message: 'Failed to authenticate via the provided access token',
                error: e.message
            });
        }
    };
}