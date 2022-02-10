/*** I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been copied
 * manually or electronically from any other source (including web sites)
 * or distributed to other students. *
 *
 *      Name: Hayaturehman Ahmadzai
 *      Student ID: hahmadzai3
 *      Creation Date: 2022-01-24
 */
const router = require('express').Router();
const user = require('../services/users.service');


/** Get all users */
/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     description: Returns all users and accepts a filter through query params
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/components/userQueryParameters/id'
 *       - $ref: '#/components/userQueryParameters/username'
 *       - $ref: '#/components/userQueryParameters/firstName'
 *       - $ref: '#/components/userQueryParameters/lastName'
 *     responses:
 *       200:
 *         description: An array of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   message:
 *                     type: string
 *                     example: User found
 *                     description: A message to indicate the status of the request
 *                   data:
 *                      type: array
 *                      items:
 *                          $ref: '#/definitions/ExistingUser'
 *       404:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 */
router.get('/', user.getAllUsers);

/** Get user by username */
/**
 * @swagger
 * /users/{username}:
 *  get:
 *    tags:
 *      - Users
 *    summary: Get user by username
 *    description: Returns a user by username
 *    produces:
 *      - application/json
 *    parameters:
 *      - allOf:
 *        - $ref: '#/components/userPathParameters/username'
 *        - required: true
 *    responses:
 *      200:
 *        description: A user is found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  message:
 *                    type: string
 *                    example: User found
 *                    description: A message to indicate the status of the request
 *                  data:
 *                    $ref: '#/definitions/ExistingUser'
 *      404:
 *        $ref: '#/components/responses/BadRequest'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 */
router.get('/:username', user.getUserByUsername);

/** Create a new user */
/**
 * @swagger
 * /users:
 *  post:
 *    tags:
 *      - Users
 *    summary: Create a new user
 *    description: Creates a new user
 *    produces:
 *      - application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/NewUser'
 *    responses:
 *      201:
 *        description: A new user is created
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  message:
 *                    type: string
 *                    example: User created
 *                    description: A message to indicate the status of the request
 *                  data:
 *                    $ref: '#/definitions/CompleteUser'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */
router.post('/', user.createUser);

/** Update user by username */
/**
 * @swagger
 * /users/{username}:
 *  put:
 *    tags:
 *      - Users
 *    summary: Update user by username
 *    description: Updates a user by username. Refresh token is automatically regenerated when password is changed.
 *    produces:
 *      - application/json
 *    parameters:
 *      - $ref: '#/components/userPathParameters/username'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/CompleteUser'
 *    responses:
 *      200:
 *        description: A user is updated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  message:
 *                    type: string
 *                    example: User updated
 *                    description: A message to indicate the status of the request
 *                  data:
 *                    $ref: '#/definitions/CompleteUser'
 *      404:
 *        $ref: '#/components/responses/BadRequest'
 */
router.put('/:username', user.updateUser);

module.exports = router;
