/*** I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been copied
 * manually or electronically from any other source (including web sites)
 * or distributed to other students. *
 *
 *      Name: Hayaturehman Ahmadzai
 *      Student ID: hahmadzai3
 *      Creation Date: 2022-01-24
 */
const Joi = require('joi');

// Mongo ObjectId validation
const idCondition = Joi.string().regex(/^[a-f\d]{24}$/i)

const usernameCondition = Joi.string().trim().min(3).max(30).pattern(/^[a-zA-Z_\-.]+$/).label('Username')
const passwordCondition = Joi.string().trim().min(8).max(255).label('Password')
const emailCondition = Joi.string().trim().email().label('Email')
const firstNameCondition = Joi.string().trim().min(3).pattern(/^[a-z A-Z\-'.]+$/).max(255).label('First Name')
const lastNameCondition = Joi.string().trim().min(3).pattern(/^[a-z A-Z\-'.]+$/).max(255).label('Last Name')
const phoneCondition = Joi.string().trim().length(10).pattern(/^[0-9]+$/).label('Phone Number')
const phonesCondition = Joi.array().items(phoneCondition).label('Phone Numbers')

const newUserValidation = Joi.object({
    email: emailCondition.required(),
    password: passwordCondition.required(),
    username: usernameCondition.required(),
    firstName: firstNameCondition.required(),
    lastName: lastNameCondition.required(),
    phone: phonesCondition
})

const existingUserValidation = Joi.object({
    email: emailCondition,
    password: passwordCondition,
    username: usernameCondition,
    firstName: firstNameCondition,
    lastName: lastNameCondition,
    phone: phonesCondition
})

const favoriteValidation = idCondition.required();

module.exports = {
    usernameCondition,
    passwordCondition,
    emailCondition,
    firstNameCondition,
    lastNameCondition,
    phoneCondition,
    phonesCondition,
    newUserValidation,
    existingUserValidation,
    favoriteValidation
}