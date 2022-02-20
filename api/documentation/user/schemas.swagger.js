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
 *         $ref: '#/components/userParameters/id'
 *       username:
 *         $ref: '#/components/userParameters/username'
 *       firstName:
 *         $ref: '#/components/userParameters/firstName'
 *       lastName:
 *         $ref: '#/components/userParameters/lastName'
 *       lastName:
 *         $ref: '#/components/userParameters/email'
 *       createdAt:
 *         $ref: '#/components/userParameters/createdAt'
 *
 *   NewUser:
 *     type: object
 *     properties:
 *       username:
 *         $ref: '#/components/userParameters/username'
 *         required: true
 *       firstName:
 *         $ref: '#/components/userParameters/firstName'
 *         required: true
 *       lastName:
 *         $ref: '#/components/userParameters/lastName'
 *         required: true
 *       password:
 *         $ref: '#/components/userParameters/password'
 *         required: true
 *       email:
 *         $ref: '#/components/userParameters/email'
 *         required: true
 *
 *   CompleteUser:
 *      allOf:
 *        - $ref: '#/definitions/ExistingUser'
 *        - $ref: '#/definitions/NewUser'
 *        - type: object
 *          properties:
 *             refreshToken:
 *               $ref: '#/components/userParameters/refreshToken'
 *             countryCode:
 *               $ref: '#/components/userParameters/countryCode'
 *             phone:
 *               $ref: '#/components/userParameters/phone'
 *             extension:
 *               $ref: '#/components/userParameters/extension'
 *             role:
 *               $ref: '#/components/userParameters/role'
 *             createdAt:
 *               $ref: '#/components/userParameters/createdAt'
 *             updatedAt:
 *               $ref: '#/components/userParameters/updatedAt'
 */
