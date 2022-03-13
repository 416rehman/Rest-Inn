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

/**
 * Returns an array representation of the provided query string (e.g. ?type=house,apartment will return ['house','apartment'])
 * If the query string is already an array, it will return the same array (e.g. ?type[]=house&type[]=apartment or ?type=house&type=apartment will return ['house','apartment'])
 * @param value
 * @return {string[]}
 */
const multiValueQuery = (value) => {
    if (typeof value === 'string') {
        return value.includes(',') ? value.split(',') : [value];
    } else if (Array.isArray(value)) {
        return value;
    } else {
        return [''];
    }
}

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
 * @return {Object} ready to use pipeline object for mongoose
 */
module.exports.propertyAggreggatePipeline = (query) => {
    let $match = {};
    let $lookup = {};
    let $unwind = {};

    if (query.host?.length) {
        $match.host = query.host;
    }

    if (query.bestSeller) {
        $match.bestSeller = JSON.parse(query.bestSeller || false);
    }

    if (query.priceMin || query.priceMax) {
        $match.price = {};
        if (query.priceMin) {
            $match.price.$gte = query.priceMin;
        }
        if (query.priceMax) {
            $match.price.$lte = query.priceMax;
        }
    }

    if (query.type) {
        $match.type = {$in: multiValueQuery(query.type)};
    }

    if (query.bedroomsMin || query.bedroomsMax) {
        $match.bedrooms = {};
        if (query.bedroomsMin) {
            $match.bedrooms.$gte = parseInt(query.bedroomsMin);
        }
        if (query.bedroomsMax) {
            $match.bedrooms.$lte = parseInt(query.bedroomsMax);
        }
    }

    if (query.bedsMin || query.bedsMax) {
        $match.beds = {};
        if (query.bedsMin) {
            $match.beds.$gte = parseInt(query.bedsMin);
        }
        if (query.bedsMax) {
            $match.beds.$lte = parseInt(query.bedsMax);
        }
    }

    if (query.bathsMin || query.bathsMax) {
        $match.baths = {};
        if (query.bathsMin) {
            $match.baths.$gte = parseInt(query.bathsMin);
        }
        if (query.bathsMax) {
            $match.baths.$lte = parseInt(query.bathsMax);
        }
    }
    if (query.location) {
        $match.$or = [{
            "location.city": query.location
        }, {
            "location.province": query.location
        }, {
            "location.country": query.location
        }];
    }
    if (query.city || query.province || query.country) {
        $match.location = {};
        if (query.city) {
            $match.location.city = query.city;
        }
        if (query.province) {
            $match.location.province = query.province;
        }
        if (query.country) {
            $match.location.country = query.country;
        }
    }

    //Example: ?amenities=wifi&amenities=pool&amenities=gym
    if (query.amenities) {
        $match.amenities = {};
        $match.amenities.$all = Array.isArray(query.amenities) ? query.amenities : [query.amenities];
    }

    if (query.bestSeller) {
        if (query.bestSeller?.toLowerCase() === 'true' || query.bestSeller === true) {
            $match.bestSeller = true;
        } else if (query.bestSeller?.toLowerCase() === 'false' || query.bestSeller === false) {
            $match.bestSeller = false;
        }
    }

    if (query.listingType) {
        $match.listingType = {$in: multiValueQuery(query.listingType)};
    }

    if (query.guestsMin || query.guestsMax) {
        $match.guests = {};
        if (query.guestsMin) {
            $match.guests.$gte = parseInt(query.guestsMin);
        }
        if (query.guestsMax) {
            $match.guests.$lte = parseInt(query.guestsMax);
        }
    }

    // if checkin and checkout are set, we need to use $lookup the dates in the booking collection
    if (query.checkIn || query.checkOut) {
        $lookup = {
            from: 'bookings',
            localField: '_id',
            foreignField: 'property',
            as: 'bookings'
        };

        $unwind = '$bookings';

        if (query.checkIn && query.checkOut) {
            $match.$and = [{
                'bookings.checkIn': {
                    $gte: new Date(query.checkIn)
                },
                'bookings.checkOut': {
                    $lte: new Date(query.checkOut)
                }
            }];
        } else {
            if (query.checkIn) {
                $match['bookings.checkIn'] = {
                    $gte: new Date(query.checkIn) || new Date()
                    }
            } else if (query.checkOut) {
                $match['bookings.checkOut'] = {
                    $lte: new Date(query.checkOut) || new Date()
                    }
            }
        }
    }
    const pipeline = []
    if (Object.keys($lookup).length) {
        pipeline.push({$lookup});
    }
    if (Object.keys($unwind).length) {
        pipeline.push({$unwind});
    }
    if (Object.keys($match).length) {
        pipeline.push({$match});
    }
    return pipeline;
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
    } else {
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