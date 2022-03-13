const bookingModel = require('./booking.model')
const {getAll} = require("../property/property.methods");


/**
 * Creates a new booking
 *
 * @param booking
 * @return {Promise<*>}
 */
module.exports.createBooking = async (booking) => {
    const newBooking = new bookingModel(booking);
    return await newBooking.save();
};


/**
 * Returns all bookings with the given filter
 *
 * @param filter {Object}
 * @param limit {Number}
 * @param page {Number}
 * @param sort {{field: Number}} -1 for descending, 1 for ascending
 * @return {Promise}
 */
module.exports.getAllBookings = async (filter={}, limit=10, page=0, sort={}) => {
    limit = Math.min(limit, 100);
    page = page <= 0 ? 1 : page;

    return bookingModel.find(filter).limit(limit).skip((page - 1) * limit).sort(sort).populate({path: 'user'}).populate({path: 'property'}).exec();
};


/**
 * Returns all host bookings (Bookings made to the host's properties)
 *
 * @param id {String}
 * @param filter {Object}
 * @param limit {Number}
 * @param page {Number}
 * @param sort {{field: Number}} -1 for descending, 1 for ascending
 */
module.exports.getBookingsForHost = (id, filter={}, limit=10, page=0, sort={}) => {
    limit = Math.min(limit, 100);
    page = page <= 0 ? 1 : page;

    const filterQuery = {
        ...filter,
    };

    getAll({host: id}).then(properties => {
        const propertyIds = properties.map(property => property._id);
        filterQuery.property = {$in: propertyIds};
        return bookingModel.find(filterQuery).limit(limit).skip((page - 1) * limit).sort(sort).populate({path: 'user'}).populate({path: 'property'}).exec();
    });
};

/** Get a booking by id
 *
 * @param id {String}
 */
module.exports.getBookingById = async (id) => {
    return bookingModel.findById(id).exec();
};


/**
 * Change the status of a booking to 'cancelled'
 *
 * @param bookingId {String}
 */
module.exports.cancelBooking = async function(bookingId) {
    return bookingModel.findByIdAndUpdate(bookingId, {status: 'cancelled'}, {new: true}).exec();
};

/**
 * Change the status of a booking to 'pending'
 *
 * @param bookingId {String}
 */
module.exports.pendingBooking = async function(bookingId) {
    return bookingModel.findByIdAndUpdate(bookingId, {status: 'pending'}, {new: true}).exec();
};

/**
 * Change the status of a booking to 'rejected'
 *
 * @param bookingId {String}
 */
module.exports.rejectBooking = async function(bookingId) {
    return bookingModel.findByIdAndUpdate(bookingId, {status: 'rejected'}, {new: true}).exec();
};

/**
 * Change the status of a booking to 'approved'
 *
 * @param bookingId {String}
 */
module.exports.approveBooking = async function(bookingId) {
    return bookingModel.findByIdAndUpdate(bookingId, {status: 'approved'}, {new: true}).exec();
};

/**
 * Update the booking
 *
 * @param bookingId
 * @param bookingData
 * @return {Promise<any>} updated booking
 */
module.exports.updateBooking = (bookingId, bookingData) => {
    return bookingModel.findByIdAndUpdate(bookingId, bookingData, {new: true}).exec();
};

/**
 * Add rating and/or review to a booking
 * @param bookingId
 * @param rating
 * @param review
 * @return {Promise<void>}
 */
module.exports.addFeedback = async function (bookingId, rating, review) {
    const booking = await this.findById(bookingId);
    if (!booking) {
        throw new Error('Booking not found');
    }
    if (booking.checkOut > new Date()) {
        throw new Error('Booking is not completed yet - cannot add feedback');
    }
    if (rating) {
        booking.rating = rating;
    }
    if (review) {
        booking.review = review;
    }
    await booking.save();
};


module.exports.propertiesInReservedDateRange = (startDate, endDate) => {
    return new Promise((resolve, reject) => {
        bookingModel.find({
            $and: [
                {
                    checkIn: {
                        $lte: endDate
                    }
                },
                {
                    checkOut: {
                        $gte: startDate
                    }
                }
            ]
        }).populate({path: 'property',
            select: '_id'
        }).exec().then(bookings => {
            resolve(bookings);
        }).catch(err => {
            reject(err);
        })
    });
}