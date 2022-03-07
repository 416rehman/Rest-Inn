const express = require('express');
const {login, renewAccessToken} = require("../services/auth.service");
const {authRefreshToken} = require("../middleware/auth.middleware");
const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Provide login credentials to get user data and refresh token
 *     description: Authenticates the user and returns the user's data including the refresh_token which can be used to obtain a new access_token from the /auth/token endpoint
 *     produces:
 *       - application/json
 *
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                  $ref: '#/components/userParameters/email'
 *               password:
 *                  $ref: '#/components/userParameters/password'
 *
 *     responses:
 *       200:
 *         description: The user's data including the refresh_token which can be used to obtain a new access_token from the /auth/token endpoint
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example:
 *                    description: The request status
 *                    required: true
 *                  data:
 *                    $ref: '#/definitions/CompleteUser'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/token:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Authorize using refreshToken to obtain a new access_token with 5 min TTL
 *     description: Returns a new access token and the user's data by providing the refresh_token in the Authorization header
 *     security:
 *       - refreshToken: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The user's data and the new access_token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example:
 *                    description: The request status
 *                    required: true
 *                  data:
 *                    type: object
 *                    properties:
 *                      access_token:
 *                        type: string
 *                        example:
 *                        description: The new access_token
 *                        required: true
 *                      user:
 *                        $ref: '#/definitions/CompleteUser'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.post('/token', authRefreshToken, renewAccessToken);

module.exports = router;