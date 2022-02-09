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

const usernameCondition = Joi.string().min(3).max(30).label('Username')
const passwordCondition = Joi.string().min(6).max(30).label('Password')
const emailCondition = Joi.string().email().label('Email')
const firstNameCondition = Joi.string().min(3).max(255).label('First Name')
const lastNameCondition = Joi.string().min(3).max(255).label('Last Name')
const phoneCondition = Joi.string().length(10).pattern(/^[0-9]+$/).label('Phone Number')
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

module.exports = {
    usernameCondition,
    passwordCondition,
    emailCondition,
    firstNameCondition,
    lastNameCondition,
    phoneCondition,
    phonesCondition,
    newUserValidation,
    existingUserValidation
}