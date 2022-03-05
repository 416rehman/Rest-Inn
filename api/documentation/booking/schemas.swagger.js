/*** I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been copied
 * manually or electronically from any other source (including web sites)
 * or distributed to other students. *
 *
 *      Name: Hayaturehman Ahmadzai
 *      Student ID: hahmadzai3
 *      Creation Date: 2022-03-04
 */

/**
 * @swagger
 * definitions:
 *   ExistingBooking:
 *     type: object
 *     properties:
 *       id:
 *          $ref: '#/components/bookingParameters/id/schema'
 *       rating:
 *          $ref: '#/components/bookingParameters/rating/schema'
 *       review:
 *          $ref: '#/components/bookingParameters/review/schema'
 *       status:
 *          $ref: '#/components/bookingParameters/status/schema'
 */

/**
 * @swagger
 * definitions:
 *   NewBooking:
 *     description: A booking to be created
 *     type: object
 *     properties:
 *       user:
 *          allOf:
 *            - $ref: '#/components/bookingParameters/user/schema'
 *            - required: true
 *       property:
 *          allOf:
 *            - $ref: '#/components/bookingParameters/property/schema'
 *            - required: true
 *       checkIn:
 *          allOf:
 *            - $ref: '#/components/bookingParameters/checkIn/schema'
 *            - required: true
 *
 *       checkOut:
 *          allOf:
 *            - $ref: '#/components/bookingParameters/checkOut/schema'
 *            - required: true
 *       price:
 *          allOf:
 *            - $ref: '#/components/bookingParameters/price/schema'
 *            - required: true
 *       guests:
 *          type: object
 *          description: The number of guests in the booking
 *          required: true
 *          properties:
 *            adults:
 *              $ref: '#/components/bookingParameters/adults/schema'
 *            children:
 *              $ref: '#/components/bookingParameters/children/schema'
 *            infants:
 *              $ref: '#/components/bookingParameters/infants/schema'
 *            pets:
 *              $ref: '#/components/bookingParameters/pets/schema'
 */

/**
 * @swagger
 * definitions:
 *   CompleteBooking:
 *     allOf:
 *       - $ref: '#/definitions/ExistingBooking'
 *       - $ref: '#/definitions/NewBooking'
 */