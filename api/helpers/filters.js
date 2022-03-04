/*** I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been copied
 * manually or electronically from any other source (including web sites)
 * or distributed to other students. *
 *
 *      Name: Hayaturehman Ahmadzai
 *      Student ID: hahmadzai3
 *      Creation Date: 2022-02-09
 */
const {bookingStatus} = require("../constants/booking.constants");
const propertyTypes = require('../constants/property.constants').propertyTypes;

module.exports.sortFilter = (query) => {
    const sort = {};
    if (query.sortBy) {
        sort[query.sortBy] = query.sortOrder || 1;
    }
    return sort;
}

/**
 * This function creates a user filter object from the given query object
 *
 * @param query
 * @return {Object} ready to use filter object for mongoose
 */
module.exports.propertyFilter = (query) => {
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
    if (query.bedroomsMin || query.bedroomsMax) {
        filter.bedrooms = {};
        if (query.bedroomsMin) {
            filter.bedrooms.$gte = query.bedroomsMin;
        }
        if (query.bedroomsMax) {
            filter.bedrooms.$lte = query.bedroomsMax;
        }
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
    if (query.location) {
        filter.$or = [{
            "location.city": query.location
        }, {
            "location.province": query.location
        }, {
            "location.country": query.location
        }];
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

    if (query.bestSeller) {
        if (query.bestSeller?.toLowerCase() === 'true'|| query.bestSeller === true) {
            filter.bestSeller = true;
        } else if (query.bestSeller?.toLowerCase() === 'false'|| query.bestSeller === false) {
            filter.bestSeller = false;
        }
    }

    if (query.listingType) {
        filter.listingType = query.listingType;
    }

    return filter;
};

/**
 * This function creates a user filter object from the given query object
 *
 * @param query
 * @return {Object} ready to use filter object for mongoose
 */
module.exports.userFilter = (query) => {
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

    if (query.email) {
        filter.email = query.email;
    }

    return filter;
}

/**
 * This function creates a booking filter object from the given query object
 *
 * @param query
 * @return {Object} ready to use filter object for mongoose
 */
module.exports.bookingFilter = (query) => {
    let filter = {};

    if (query.property) {
        filter.property = query.property;
    }

    // If both checkin and checkout are given, then we need to make sure that the booking is within the given 2 dates
    if (query.checkIn && query.checkOut) {
        filter.checkIn = {};
        filter.checkIn.$gte = query.checkIn;
        filter.checkOut = {};
        filter.checkOut.$lte = query.checkOut;
    }
    else {
        if (query.checkIn) {
            filter.checkIn = {};
            filter.checkIn.$gte = query.checkIn;
            filter.checkIn.$lte = query.checkIn;
        }
        if (query.checkOut) {
            filter.checkOut = {};
            filter.checkOut.$gte = query.checkOut;
            filter.checkOut.$lte = query.checkOut;
        }
    }

    if (query.status && bookingStatus.includes(query.status)) {
        filter.status = query.status;
    }

    if (query.guests) {
        filter.user = query.user;
    }

    if (query.price) {
        filter.price = query.price;
    }

    return filter;
}