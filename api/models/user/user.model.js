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
const {roles} = require("../../constants/user.constants");
const {getAllDialCodes} = require("../../constants/countries.constants");
const {obfuscate} = require("../../helpers/mongooseGetters");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        get: obfuscate
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
    countryCode: {
        type: String,
        default: '+1',
        enum: getAllDialCodes()
    },
    phone:  {
        type: String,
        unique: true,
        sparse: true
    },
    extension: {
        type: String,
    },
    role: {
        type: String,
        enum: roles,
        default: 'user'
    },
    activated: {
        type: Boolean,
        default: false
    },
    favorites: {
        properties: {
            type: [{
                _id: false,
                listingId: mongoose.Schema.Types.ObjectId,
                date: Date
            }],
            default: []
        }
    },
}, {
    timestamps: true,
    toJSON: {
        getters: true,
    },
    collation: {
        locale: 'en_US',
        strength: 2
    }
});

UserSchema.pre('save', async function (next) {
    if (this.isModified("password")) {
        // 1. Hash the password
        this.password = await bcrypt.hash(this.password, 10);

        // 2. Generate new refresh token
        jsonwebtoken.sign({id: this.id, username: this.username}, process.env.SECRET, {}, (err, token) => {
            if (err) {
                return next(err);
            }
            this.refreshToken = token;
        });
    }
    next();
});


const Model = mongoose.model('User', UserSchema);

module.exports = Model;