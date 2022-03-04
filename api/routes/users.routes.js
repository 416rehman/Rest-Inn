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
 *       - $ref: '#/components/userQueryParameters/email'
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

/** Get user's favorites */
/**
 * @swagger
 * /users/{username}/favorites:
 *  get:
 *    tags:
 *      - Users
 *      - Favorites
 *    summary: Get user's favorites
 *    description: Gets a user's favorites
 *    produces:
 *      - application/json
 *    parameters:
 *      - $ref: '#/components/userPathParameters/username'
 *    responses:
 *      200:
 *        description: A user's favorites are returned
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  message:
 *                    type: string
 *                    example: Favorites returned
 *                    description: A message to indicate the status of the request
 *                  data:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/userParameters/favorites/schema'
 *      404:
 *        $ref: '#/components/responses/BadRequest'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */
router.get('/:username/favorites', user.getFavorites);

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

/** Add to user's favorites */
/**
 * @swagger
 * /users/{username}/favorites/{listingId}:
 *  post:
 *    tags:
 *      - Favorites
 *    summary: Add to user's favorites
 *    description: Adds a favorite to a user's favorites
 *    produces:
 *      - application/json
 *    parameters:
 *      - $ref: '#/components/userPathParameters/username'
 *      - allOf:
 *        - $ref: '#/components/propertyPathParameters/id'
 *        - name: listingId
 *    responses:
 *      200:
 *        description: A favorite is added to a user's favorites
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  message:
 *                    type: string
 *                    example: Favorite added to favorites
 *                    description: A message to indicate the status of the request
 *                  data:
 *                    $ref: '#/components/userParameters/favorites/schema'
 *      404:
 *        $ref: '#/components/responses/BadRequest'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */
router.post('/:username/favorites/:listingId', user.addFavorite);

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

/** Remove from user's favorites */
/**
 * @swagger
 * /users/{username}/favorites/{listingId}:
 *  delete:
 *    tags:
 *      - Favorites
 *    summary: Remove a favorite from a user's favorites
 *    description: Remove a favorite from a user's favorites
 *    produces:
 *      - application/json
 *    parameters:
 *      - $ref: '#/components/userPathParameters/username'
 *      - allOf:
 *        - $ref: '#/components/propertyPathParameters/id'
 *        - name: listingId
 *    responses:
 *      200:
 *        description: A favorite is removed from a user's favorites
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  message:
 *                    type: string
 *                    example: Favorite removed from favorites
 *                    description: A message to indicate the status of the request
 *                  data:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: The id of the listing of the deleted favorite
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:username/favorites/:listingId', user.removeFavorite);

/** Delete user by username */
/**
 * @swagger
 * /users/{username}:
 *  delete:
 *    tags:
 *      - Users
 *    summary: Delete user by username
 *    description: Deletes a user by username
 *    produces:
 *      - application/json
 *    parameters:
 *      - $ref: '#/components/userPathParameters/username'
 *    responses:
 *      200:
 *        description: A user is deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  message:
 *                    type: string
 *                    example: User deleted
 *                    description: A message to indicate the status of the request
 *                  data:
 *                    $ref: '#/definitions/CompleteUser'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:username', user.deleteUser);

module.exports = router;
