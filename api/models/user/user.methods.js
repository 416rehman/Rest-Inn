const userSchema = require("./user.model");

// Sensitive fields
const ommited_fields = {
    password: 0,
    phoneNumbers: 0,
    refreshToken: 0,
    countryCode: 0,
    extension: 0,
    role: 0,
    updatedAt: 0,
}

/**
 * Get all users
 *
 * @param filter
 * @return {Promise<Array<HydratedDocument<any, {}, {}>>>}
 */
module.exports.getAll = (filter={}) => {
    return userSchema.find(filter, ommited_fields).exec();
};

/**
 * Get user by username
 *
 * @param username
 * @return {Promise<any>}
 */
module.exports.getByUsername = (username) => {
    return userSchema.findOne({username: username}, ommited_fields).exec();
};

/**
 * Get user by email
 *
 * @param email
 * @return {Promise<any>}
 */
module.exports.getByEmail = (email) => {
    return userSchema.findOne({email: email},ommited_fields).exec();
};

/**
 * Update user by username
 *
 * @param username
 * @param user
 * @return {Promise<any>}
 */
module.exports.updateUser = (username, user) => {
    return userSchema.findOneAndUpdate({username: username}, user, {
        new: true, // return the new user instead of the old one
        projection: ommited_fields
    }).exec();
};

/**
 * Add a favorite property/listing to a user
 *
 * @param username
 * @param id - property/listing id
 * @return {Promise<any>}
 */
module.exports.addFavoriteProperty = (username, id) => {
    return userSchema.findOneAndUpdate({username: username}, {
        $push: {
            'favorites.properties': {
                id: id,
                date: new Date()
            }
        }
    }, {
        new: true, // return the new user instead of the old one
        projection: {email: 0, ...ommited_fields}
    }).exec();
};

/**
 * Remove a favorite property/listing from a user
 *
 * @param username
 * @param id - property/listing id
 * @return {Promise<any>}
 */
module.exports.removeFavoriteProperty = (username, id) => {
    return userSchema.findOneAndUpdate({username: username}, {
        $pull: {
            'favorites.properties': {
                id: id
            }
        }
    }, {
        new: true, // return the new user instead of the old one
        projection: {email: 0, ...ommited_fields}
    }).exec();
};

/**
 * Get favorite property/listing by username
 *
 * @param username
 * @return {Promise<any>}
 */
module.exports.getFavoriteProperties = (username) => {
    return userSchema.findOne({username: username}, {
        'favorites.properties': 1,
    }).exec();
};

/**
 * Add User
 *
 * @param data
 * @return {Promise<any>}
 */
module.exports.addUser = async (data) => {
    const user = new userSchema(data);
    await user.save();
    return user;
};

/**
 * Delete User
 *
 * @param username
 * @return {Promise<any>}
 */
module.exports.deleteUser = (username) => {
    return userSchema.findOneAndDelete({username: username}, {
        projection: ommited_fields,
        new: true
    }).exec();
};