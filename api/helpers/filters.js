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

    if (query.price_min || query.price_max) {
        filter.price = {};
        if (query.price_min) {
            filter.price.$gte = query.price_min;
        }
        if (query.price_max) {
            filter.price.$lte = query.price_max;
        }
    }

    if (query.type && propertyTypes.includes(query.type)) {
        filter.type = query.type;
    }

    if (query.min_beds || query.max_beds) {
        filter.beds = {};
        if (query.min_beds) {
            filter.beds.$gte = query.min_beds;
        }
        if (query.max_beds) {
            filter.beds.$lte = query.max_beds;
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

module.exports.buildUserFilter = (query) => {
    let filter = {};

    if (query.username) {
        filter.username = query.username;
    }

    if (query.email) {
        filter.email = query.email;
    }

    if (query.firstName) {
        filter.firstName = query.firstName;
    }

    if (query.lastName) {
        filter.lastName = query.lastName;
    }

    if (query.phone) {
        filter.phone = {};
        filter.phone.$in = Array.isArray(query.phone) ? query.phone : [query.phone];
    }

    return filter;
}