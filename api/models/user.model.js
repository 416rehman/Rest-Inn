/*** I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been copied
 * manually or electronically from any other source (including web sites)
 * or distributed to other students. *
 *
 *      Name: Hayaturehman Ahmadzai
 *      Student ID: hahmadzai3
 *      Creation Date: 2022-01-24
 */
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
        required: true,
        unique: true
    },
    refreshToken: {
        type: String,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone:  [{
        type: String,
        unique: true
    }],
}, {timestamps: true});

UserSchema.pre('save', async function (next) {
    if (this.isModified("password")) {
        // 1. Hash the password
        this.password = await bcrypt.hash(this.password, 10);

        // 2. Generate new refresh token
        jsonwebtoken.sign({username: this.username}, process.env.SECRET, {}, (err, token) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            this.refreshToken = token;
        });
    }
    next();
});

const userSchema = mongoose.model('User', UserSchema);

module.exports.userSchema = userSchema;

// Sensitive fields
const PROJECTION = {
    password: 0,
    phoneNumbers: 0,
    refreshToken: 0,
    email: 0,
    updatedAt: 0,
}

module.exports.getAll = (filter={}) => {
    return userSchema.find(filter, PROJECTION).exec();
};

module.exports.getByUsername = (username) => {
    return userSchema.findOne({username: username}, PROJECTION).exec();
};

module.exports.getByEmail = (email) => {
    return userSchema.findOne({email: email},PROJECTION).exec();
};

module.exports.updateUser = (username, user) => {
    return userSchema.findOneAndUpdate({username: username}, user, {
        new: true, // return the new user instead of the old one
        projection: PROJECTION
    }).exec();
};

module.exports.addUser = async (data) => {
    const user = new userSchema(data);
    await user.save();
    return user;
};