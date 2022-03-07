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
 * components:
 *  responses:
 *    NotFound:
 *       description: Requested resource not found in the database
 *       content:
 *           application/json:
 *               schema:
 *                   type: object
 *                   properties:
 *                       message:
 *                           type: string
 *                           description: The message of the response
 *                           example: "No objects found"
 *    InternalServerError:
 *       description: An error occurred - Server could not process the request.
 *       content:
 *         application/json:
 *            schema:
 *               type: object
 *               properties:
 *                   message:
 *                     type: string
 *                     description: The message of the response
 *                     example: "An error occurred"
 *                   error:
 *                     description: The error object with error details
 *                     type: object
 *                     additionalProperties:
 *                       type: string
 *                       description: The error object key
 *                       example: "An error occurred"
 *    BadRequest:
 *       description: Bad request - Check your input parameters, request body and/or query string.
 *       content:
 *         application/json:
 *            schema:
 *               type: object
 *               properties:
 *                   message:
 *                     type: string
 *                     description: The message of the response
 *                     example: "Bad request"
 *                   error:
 *                     description: The error object with error details
 *                     type: object
 *                     additionalProperties:
 *                       type: string
 *                       description: The error object key
 *                       example: "Invalid query parameter"
 *    Unauthorized:
 *       description: Unauthorized - Check your credentials.
 *       content:
 *         application/json:
 *            schema:
 *               type: object
 *               properties:
 *                   message:
 *                     type: string
 *                     description: The message of the response
 *                     example: "Unauthorized"
 *                   error:
 *                     description: The error object with error details
 *                     type: string
 *                     example: "Invalid credentials"
 */