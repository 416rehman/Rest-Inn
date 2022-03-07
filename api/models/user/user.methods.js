const userModel = require("./user.model");

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
 * @param omitSensitiveData
 * @return {Promise<Array<HydratedDocument<any, {}, {}>>>}
 */
module.exports.getAll = (filter={}, omitSensitiveData = true) => {
    return userModel.find(filter, omitSensitiveData ? ommited_fields : {}).exec();
};

/**
 * Get user by username
 *
 * @param username
 * @param omitSensitiveData
 * @param filter
 * @return {Promise<any>}
 */
module.exports.getByUsername = (username, omitSensitiveData = true, filter={}) => {
    return userModel.findOne({username: username, ...filter}, omitSensitiveData ? ommited_fields : {}).exec();
};

/**
 * Get user by email
 *
 * @param email
 * @param omitSensitiveData
 * @return {Promise<any>}
 */
module.exports.getByEmail = (email, omitSensitiveData = true) => {
    return userModel.findOne({email: email},omitSensitiveData ? ommited_fields : {}).exec();
};

/**
 * Update user by username
 *
 * @param username
 * @param user
 * @param omitSensitiveData
 * @return {Promise<any>}
 */
module.exports.updateUser = (username, user, omitSensitiveData = true) => {
    return userModel.findOneAndUpdate({username: username}, user, {
        new: true, // return the new user instead of the old one
        projection: omitSensitiveData ? ommited_fields : {}
    }).exec();
};

/**
 * Add a favorite property/listing to a user
 *
 * @param username
 * @param listingId - property/listing id
 * @param omitSensitiveData
 * @return {Promise<any>}
 */
module.exports.addFavoriteProperty = (username, listingId, omitSensitiveData = true) => {
    const projection = (omitSensitiveData ? ommited_fields : {})
    return userModel.findOneAndUpdate({username: username}, {
        $push: {
            'favorites.properties': {
                listingId: listingId,
                date: new Date()
            }
        }
    }, {
        new: true, // return the new user instead of the old one
        projection: {email: 0, ...projection}
    }).exec();
};

/**
 * Remove a favorite property/listing from a user
 *
 * @param username
 * @param listingId - property/listing id
 * @param omitSensitiveData
 * @return {Promise<any>}
 */
module.exports.removeFavoriteProperty = (username, listingId, omitSensitiveData = true) => {
    const projection = (omitSensitiveData ? ommited_fields : {})
    return userModel.findOneAndUpdate({username: username}, {
        $pull: {
            'favorites.properties': {
                listingId: listingId
            }
        }
    }, {
        new: true, // return the new user instead of the old one
        projection: {email: 0, ...projection}
    }).exec();
};

/**
 * Get favorite property/listing by username
 *
 * @param username
 * @return {Promise<any>}
 */
module.exports.getFavoriteProperties = (username) => {
    return userModel.findOne({username: username}, {
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
    const user = new userModel(data);
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
    return userModel.findOneAndDelete({username: username}, {
        new: true
    }).exec();
};