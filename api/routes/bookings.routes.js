const express = require('express')
const {getBookingsByUser, createBooking, approveBooking, rejectBooking, cancelBooking, getBooking} = require("../services/bookings.service");
const router = express.Router()

/** Get all bookings of the logged-in user */
/**
 * @swagger
 * /bookings:
 *  get:
 *    tags:
 *      - Bookings
 *    description: Get all bookings of the logged-in user
 *    summary: Get all bookings of the logged-in user
 *    parameters:
 *      - $ref: '#/components/bookingQueryParameters/user'
 *      - $ref: '#/components/bookingQueryParameters/property'
 *      - $ref: '#/components/bookingQueryParameters/status'
 *      - $ref: '#/components/bookingQueryParameters/checkIn'
 *      - $ref: '#/components/bookingQueryParameters/checkOut'
 *      - $ref: '#/components/bookingQueryParameters/priceMin'
 *      - $ref: '#/components/bookingQueryParameters/priceMax'
 *      - $ref: '#/components/bookingQueryParameters/ratingMin'
 *      - $ref: '#/components/bookingQueryParameters/ratingMax'
 *      - $ref: '#/components/bookingQueryParameters/adultsMin'
 *      - $ref: '#/components/bookingQueryParameters/adultsMax'
 *      - $ref: '#/components/bookingQueryParameters/childrenMin'
 *      - $ref: '#/components/bookingQueryParameters/childrenMax'
 *      - $ref: '#/components/bookingQueryParameters/infantsMin'
 *      - $ref: '#/components/bookingQueryParameters/infantsMax'
 *      - $ref: '#/components/bookingQueryParameters/petsMin'
 *      - $ref: '#/components/bookingQueryParameters/petsMax'
 *    responses:
 *      200:
 *        description: a successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  message:
 *                    type: string
 *                    example: Bookings retrieved successfully
 *                    description: The message of the response
 *                  data:
 *                    description: The bookings of the user
 *                    $ref: '#/definitions/CompleteBooking'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */
router.get('/', getBookingsByUser)

/** Get a booking by id */
/**
 * @swagger
 * /bookings/{id}:
 *  get:
 *    tags:
 *      - Bookings
 *    description: Get a booking by id
 *    summary: Get a booking by id
 *    parameters:
 *      - $ref: '#/components/bookingPathParameters/id'
 *    responses:
 *      200:
 *        description: a successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  message:
 *                    type: string
 *                    example: Booking retrieved successfully
 *                    description: The message of the response
 *                  data:
 *                    description: The booking
 *                    $ref: '#/definitions/CompleteBooking'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', getBooking)

/** Create a booking for the logged-in user */
/**
 * @swagger
 * /bookings:
 *   post:
 *     tags:
 *       - Bookings
 *     description: Create a booking for the logged-in user
 *     summary: Create a booking for the logged-in user
 *     requestBody:
 *       description: The booking to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/NewBooking'
 *     responses:
 *       201:
 *         description: a successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Booking created successfully
 *                   description: The message of the response
 *                 data:
 *                   description: The created booking
 *                   $ref: '#/definitions/CompleteBooking'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 */
router.post('/', createBooking)

/** Approves a booking for the logged-in user */
/**
 * @swagger
 * /bookings/{id}/approve:
 *   put:
 *     tags:
 *       - Bookings
 *     description: Sets the booking status to approved - indicates that the reservation has been accepted by the host
 *     summary: Approves a booking for the logged-in user
 *     parameters:
 *       - $ref: '#/components/bookingPathParameters/id'
 *     responses:
 *       200:
 *         description: a successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Booking reset successfully
 *                   description: The message of the response
 *                 data:
 *                   description: The booking set to approved
 *                   $ref: '#/definitions/CompleteBooking'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 */
router.put('/:id/approve', approveBooking)

/**
 * @swagger
 * /bookings/{id}/reject:
 *   put:
 *     tags:
 *       - Bookings
 *     description: Sets the booking status to rejected - indicates that the reservation has been rejected by the host
 *     summary: Rejects a booking for the logged-in user
 *     parameters:
 *       - $ref: '#/components/bookingPathParameters/id'
 *
 *     responses:
 *       200:
 *         description: a successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Booking rejected successfully
 *                   description: The message of the response
 *                 data:
 *                   description: The booking set to rejected
 *                   $ref: '#/definitions/CompleteBooking'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put('/:id/reject', rejectBooking)

/** Reject a booking for the logged-in user */
/**
 * @swagger
 * /bookings/{id}/cancel:
 *   put:
 *     tags:
 *       - Bookings
 *     description: Sets the booking status to cancelled - indicates that the reservation has been cancelled by the guest after it was approved
 *     summary: Cancels a booking for the logged-in user
 *     parameters:
 *       - $ref: '#/components/bookingPathParameters/id'
 *     responses:
 *       200:
 *         description: a successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Booking cancelled successfully
 *                   description: The message of the response
 *                 data:
 *                   description: The booking set to cancelled
 *                   $ref: '#/definitions/CompleteBooking'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 *
 */
router.put('/:id/cancel', cancelBooking)

module.exports = router