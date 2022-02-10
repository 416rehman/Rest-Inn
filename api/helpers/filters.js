/*** I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been copied
 * manually or electronically from any other source (including web sites)
 * or distributed to other students. *
 *
 *      Name: Hayaturehman Ahmadzai
 *      Student ID: hahmadzai3
 *      Creation Date: 2022-02-09
 */
const propertyTypes = require('../constants/property.constants').propertyTypes;

/**
 * This function creates a filter object for the given property type
 * which can be used to filter the properties in the database.
 * @returns {object} filter object
 */
module.exports.buildPropertyFilter = (query) => {
    let filter = {};

    if (query.priceMin || query.priceMax) {
        filter.price = {};
        if (query.priceMin) {
            filter.price.$gte = query.priceMin;
        }
        if (query.priceMax) {
            filter.price.$lte = query.priceMax;
        }
    }

    if (query.type && propertyTypes.includes(query.type)) {
        filter.type = query.type;
    }

    if (query.bedsMin || query.bedsMax) {
        filter.beds = {};
        if (query.bedsMin) {
            filter.beds.$gte = query.bedsMin;
        }
        if (query.bedsMax) {
            filter.beds.$lte = query.bedsMax;
        }
    }

    if (query.min_baths || query.max_baths) {
        filter.baths = {};
        if (query.min_baths) {
            filter.baths.$gte = query.min_baths;
        }
        if (query.max_baths) {
            filter.baths.$lte = query.max_baths;
        }
    }

    if (query.city || query.province || query.country) {
        filter.location = {};
        if (query.city) {
            filter.location.city = query.city;
        }
        if (query.province) {
            filter.location.province = query.province;
        }
        if (query.country) {
            filter.location.country = query.country;
        }
    }

    //Example: ?amenities=wifi&amenities=pool&amenities=gym
    if (query.amenities) {
        filter.amenities = {};
        filter.amenities.$all = Array.isArray(query.amenities) ? query.amenities : [query.amenities];
    }

    if (query.best_seller) {
        if (query.best_seller === 'true') {
            filter.best_seller = true;
        } else if (query.best_seller === 'false') {
            filter.best_seller = false;
        }
    }

    return filter;
};

/** Email and phone number filtering is not supported from this endpoint since they are sensitive data. **/
module.exports.buildUserFilter = (query) => {
    let filter = {};

    if (query.id) {
        filter._id = query.id;
    }

    if (query.username) {
        filter.username = query.username;
    }

    if (query.firstName) {
        filter.firstName = query.firstName;
    }

    if (query.lastName) {
        filter.lastName = query.lastName;
    }

    return filter;
}