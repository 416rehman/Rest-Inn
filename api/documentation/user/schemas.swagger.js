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
 * @swagger
 * definitions:
 *   ExistingUser:
 *     type: object
 *     properties:
 *       _id:
 *         $ref: '#/components/userParameters/id/schema'
 *       username:
 *         $ref: '#/components/userParameters/username/schema'
 *       firstName:
 *         $ref: '#/components/userParameters/firstName/schema'
 *       lastName:
 *         $ref: '#/components/userParameters/lastName/schema'
 *       email:
 *         $ref: '#/components/userParameters/email/schema'
 *       createdAt:
 *         $ref: '#/components/userParameters/createdAt/schema'
 *       favorites:
 *         $ref: '#/components/userParameters/favorites/schema'
 *
 *   NewUser:
 *     type: object
 *     properties:
 *       username:
 *         $ref: '#/components/userParameters/username/schema'
 *         required: true
 *       firstName:
 *         $ref: '#/components/userParameters/firstName/schema'
 *         required: true
 *       lastName:
 *         $ref: '#/components/userParameters/lastName/schema'
 *         required: true
 *       password:
 *         $ref: '#/components/userParameters/password/schema'
 *         required: true
 *       email:
 *         $ref: '#/components/userParameters/email/schema'
 *         required: true
 *
 *   CompleteUser:
 *      allOf:
 *        - $ref: '#/definitions/ExistingUser'
 *        - $ref: '#/definitions/NewUser'
 *        - type: object
 *          properties:
 *             refreshToken:
 *               $ref: '#/components/userParameters/refreshToken/schema'
 *             countryCode:
 *               $ref: '#/components/userParameters/countryCode/schema'
 *             phone:
 *               $ref: '#/components/userParameters/phone/schema'
 *             extension:
 *               $ref: '#/components/userParameters/extension/schema'
 *             role:
 *               $ref: '#/components/userParameters/role/schema'
 *             createdAt:
 *               $ref: '#/components/userParameters/createdAt/schema'
 *             updatedAt:
 *               $ref: '#/components/userParameters/updatedAt/schema'
 */
