const {newBookingSchema, existingBookingSchema} = require('../helpers/booking-validation')
const {createBooking, getBookingsByUser, getBookingById, cancelBooking, approveBooking, rejectBooking} = require("../models/booking/booking.methods");
const {bookingFilter, sortFilter} = require("../helpers/filters");

module.exports.createBooking = (req, res) => {
    newBookingSchema.validateAsync(req.body).then(cleanedBody => {
        createBooking(cleanedBody).then(booking => {
            res.status(201).json({
                message: "Booking created successfully",
                data: booking
            })
        }).catch(err => {
            res.status(500).json({
                message: "Error creating booking",
                error: err.message
            })
        })
    }).catch(err => {
        res.status(400).json({
            message: 'Invalid data',
            error: err.message
        })
    })
}

/** TODO:
 *  - Users should only be able to see their own bookings
 */
module.exports.getBookingsByUser = (req, res) => {
    const {page, limit, user} = req.query;
    const sort = sortFilter(req.query)

    existingBookingSchema.validateAsync(req.query).then(cleanedQuery => {
        const filter = bookingFilter(cleanedQuery);

        getBookingsByUser(user, filter, limit, page, sort).then(bookings => {
            res.status(200).json({
                message: "Bookings retrieved successfully",
                data: bookings
            })
        }).catch(err => {
            res.status(500).json({
                message: "Error retrieving bookings",
                error: err.message
            })
        })
    }).catch(err => {
        res.status(400).json({
            message: 'Validation error in query',
            error: err.message
        })
    })
}

/** TODO:
 *  - Users should only be able to see their own bookings
 */
module.exports.getBooking = (req, res) => {
    const {id} = req.params;

    getBookingById(id).then(booking => {
        res.status(200).json({
            message: "Booking retrieved successfully",
            data: booking
        })
    }).catch(err => {
        res.status(500).json({
            message: "Error retrieving booking",
            error: err.message
        })
    })
}

/** TODO:
 *  - Should only be accessible by the guest or host
 */
module.exports.cancelBooking = (req, res) => {
    const {id} = req.params;

    cancelBooking(id).then(booking => {
        res.status(200).json({
            message: "Booking cancelled successfully",
            data: booking
        })
    }).catch(err => {
        res.status(500).json({
            message: "Error cancelling booking",
            error: err.message
        })
    })
}

/** TODO:
 *  - Should only be accessible by the host
 */
module.exports.approveBooking = (req, res) => {
    const {id} = req.params;

    approveBooking(id).then(booking => {
        res.status(200).json({
            message: "Booking approved successfully",
            data: booking
        })
    }).catch(err => {
        res.status(500).json({
            message: "Error approving booking",
            error: err.message
        })
    })
}

/** TODO:
 *  - Should only be accessible by the host
 */
module.exports.rejectBooking = (req, res) => {
    const {id} = req.params;

    rejectBooking(id).then(booking => {
        res.status(200).json({
            message: "Booking rejected successfully",
            data: booking
        })
    }).catch(err => {
        res.status(500).json({
            message: "Error rejecting booking",
            error: err.message
        })
    })
}