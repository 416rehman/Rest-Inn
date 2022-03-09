const express = require('express')
const {validate} = require("../services/valid.service");
const router = express.Router()

/** Validates the received fields */
/**
 * @swagger
 * /valid:
 *   post:
 *     tags:
 *       - Meta
 *     summary: Validates a received field
 *     description: Multiple fields are not supported. Supported fields are username, firstName, lastName, email, phone, password
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 example: value
 *                 description: The field to be validated (i.e "username":" john")
 *                 required: true
 *     responses:
 *       200:
 *         description: The validation result.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: The validation result.
 *               example: The field is valid.
 *             error:
 *               type: string
 *               example: The field is invalid.
 *               description: if validation failed, this field contains the error message, otherwise it is empty.
 *       400:
 *          $ref: '#/components/responses/BadRequest'
 *
 *       500:
 *         description: Validation failed.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: The validation result.
 *               example: The field is invalid.
 *             error:
 *               type: string
 *               example: The field is invalid.
 *               description: Contains the validation error message
 *
 *
 *
 *
 */
router.post('/', validate)

module.exports = router