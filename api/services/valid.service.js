const userMethods = require('../models/user/user.methods')
const {emailCondition, usernameCondition, passwordCondition, firstNameCondition, lastNameCondition} = require("../helpers/user-validation");

module.exports.validate = (req, res) => {
    if (req.body.email) validateEmail(req, res);
    else if (req.body.username) validateUsername(req, res);
    else if (req.body.password) validatePassword(req, res);
    else if (req.body.firstName) validateFirstName(req, res);
    else if (req.body.lastName) validateLastName(req,res);
    else res.status(400).json({
            message: "Invalid body - supported fields are email, username, password, firstName, lastName"
    });
}

const validateEmail = (req, res) => {
    emailCondition.validateAsync(req.body?.email).then(result => {
        userMethods.getAll({email: result})
            .then(user => {
                if (user && user.length > 0) {
                    res.status(500).json({
                        message: 'Validation Failed',
                        error: 'Email is already in use'
                    })
                } else {
                    res.status(200).json({
                        message: 'Email is available',
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Error validating email',
                    error: err
                })
            })
    }).catch(() => {
        res.status(500).json({
            message: 'Error validating email',
            error: `Invalid email`
        })
    })
}

const validateUsername = (req, res) => {
    usernameCondition.validateAsync(req.body.username).then(result => {
        userMethods.getByUsername(result)
            .then(user => {
                if (user) {
                    res.status(500).json({
                        message: 'Validation Failed',
                        error: 'Username is already in use'
                    })
                } else {
                    res.status(200).json({
                        message: 'Username is available',
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Error validating username',
                    error: err
                })
            })
    }).catch(err => {
        let error = 'Invalid username'
        if (err.details[0].type === 'string.min') {
            error = 'Min length: ' + err.details[0].context.limit + ' letters'
        }
        else if (err.details[0].type === 'string.max') {
            error = 'Max length: ' + err.details[0].context.limit + ' letters'
        }
        else if (err.details[0].type === 'string.pattern.base') {
            error = 'Only . _ - special characters are allowed'
        }
        res.status(500).json({
            message: 'Error validating username',
            error
        })
    })
}

const validatePassword = (req, res) => {
    passwordCondition.validateAsync(req.body.password).then(() => {
        res.status(200).json({
            message: 'Password is valid',
        })
    }).catch(err => {
        let error = 'Invalid password'
        if (err.details[0].type === 'string.min') {
            error = 'Min length: ' + err.details[0].context.limit + ' letters'
        }
        else if (err.details[0].type === 'string.max') {
            error = 'Max length: ' + err.details[0].context.limit + ' letters'
        }
        else if (err.details[0].type === 'string.pattern.base') {
            error = 'Only ._- special characters allowed'
        }
        res.status(500).json({
            message: 'Error validating password',
            error
        })
    })
}

const validateFirstName = (req, res) => {
    firstNameCondition.validateAsync(req.body.firstName).then(result => {
        res.status(200).json({
            message: 'First Name is valid',
        })
    }).catch(err => {
        let error = 'Invalid name'
        if (err.details[0].type === 'string.min') {
            error = 'Min length: ' + err.details[0].context.limit + ' letters'
        }
        else if (err.details[0].type === 'string.max') {
            error = 'Max length: ' + err.details[0].context.limit + ' letters'
        }
        else if (err.details[0].type === 'string.pattern.base') {
            error = 'Only .-\' special characters allowed'
        }
        res.status(500).json({
            message: 'Error validating first name',
            error
        })
    })
}

const validateLastName = (req, res) => {
    lastNameCondition.validateAsync(req.body.lastName).then(result => {
        res.status(200).json({
            message: 'Last Name is valid',
        })
    }).catch(err => {
        let error = 'Invalid last name'
        if (err.details[0].type === 'string.min') {
            error = 'Min length: ' + err.details[0].context.limit + ' letters'
        }
        else if (err.details[0].type === 'string.max') {
            error = 'Max length: ' + err.details[0].context.limit + ' letters'
        }
        else if (err.details[0].type === 'string.pattern.base') {
            error = 'Only .-\' special characters allowed'
        }
        res.status(500).json({
            message: 'Error validating last name',
            error
        })
    })
}