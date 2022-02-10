/*** I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been copied
 * manually or electronically from any other source (including web sites)
 * or distributed to other students. *
 *
 *      Name: Hayaturehman Ahmadzai
 *      Student ID: hahmadzai3
 *      Creation Date: 2022-02-09
 */

/**
 *  user: write access to owned objects
 *  admin: write access to all objects
 */
const roles = ['user', 'admin'];

/**
 * @swagger
 * components:
 *  enums:
 *    rolesEnum:
 *      - user
 *      - admin
 */

module.exports = {
    roles,
};