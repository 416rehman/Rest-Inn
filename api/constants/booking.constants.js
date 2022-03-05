module.exports.bookingStatus = [
    'pending', // When the booking is created
    'approved', // When the booking is approved by the host
    'rejected', // When the booking is rejected by the host
    'cancelled', // When the booking is cancelled by the guest
];

/**
 * @swagger
 *  components:
 *      enums:
 *          bookingStatusEnum:
 *              enum:
 *                  - 'pending'
 *                  - 'approved'
 *                  - 'rejected'
 *                  - 'cancelled'
 */