/*** I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been copied
 * manually or electronically from any other source (including web sites)
 * or distributed to other students. *
 *
 *      Name: Hayaturehman Ahmadzai
 *      Student ID: hahmadzai3
 *      Creation Date: 2022-01-24
 */

const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        // required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumbers: {
        type: [String],
    }
}, {timestamps: true});
const userSchema = mongoose.model('User', UserSchema);

module.exports.userSchema = userSchema;

module.exports.getAll = () => {
    return userSchema.find({}, {
        // Exclude sensitive information
        password: 0,
        phoneNumbers: 0,
        refreshToken: 0,
        email: 0,
        updatedAt: 0,
    }).exec();
};

module.exports.getByUsername = (username) => {
    return userSchema.findOne({username: username}).exec();
};

module.exports.getByEmail = (email) => {
    return userSchema.findOne({email: email}).exec();
};

module.exports.addUser = async (data) => {
    const user = new userSchema(data);
    await user.save();
    return user;
};