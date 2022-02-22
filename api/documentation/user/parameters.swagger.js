
/**
 * @swagger
 * components:
 *   userParameters:
 *      id:
 *        name: id
 *        schema:
 *          readOnly: true
 *          description: The id of the user object
 *          type: string
 *          format: string
 *
 *      username:
 *        name: username
 *        schema:
 *          description: The username of the object
 *          type: string
 *          format: username
 *          minLength: 3
 *          maxLength: 30
 *
 *      firstName:
 *        name: firstName
 *        schema:
 *          description: The first name of the user
 *          type: string
 *          format: name
 *          minLength: 3
 *          maxLength: 255
 *          pattern: ^[a-z A-Z\-.]+$
 *
 *      lastName:
 *        name: lastName
 *        schema:
 *          description: The last name of the user
 *          type: string
 *          format: name
 *          minLength: 3
 *          maxLength: 255
 *          pattern: ^[a-z A-Z\-.]+$
 *
 *      email:
 *        name: email
 *        schema:
 *          description: The email of the user
 *          type: string
 *          format: email
 *          minLength: 3
 *          maxLength: 255
 *
 *      password:
 *        name: password
 *        schema:
 *          description: The password of the user
 *          type: string
 *          format: password
 *          minLength: 8
 *          maxLength: 255
 *
 *      refreshToken:
 *        name: refreshToken
 *        schema:
 *          description: The refresh token of the user
 *          type: string
 *          format: string
 *          minLength: 8
 *          maxLength: 512
 *        readOnly: true
 *
 *      countryCode:
 *        name: countryCode
 *        schema:
 *          description: The country code of the user
 *          type: string
 *          format: string
 *          $ref: "#/components/enums/countryCodesEnum"
 *
 *      phone:
 *        name: phone
 *        schema:
 *          description: The phone of the user
 *          type: string
 *          format: phone
 *          minLength: 10
 *          maxLength: 10
 *
 *      extension:
 *        name: extension
 *        schema:
 *          description: The extension of the user
 *          type: string
 *          format: phone
 *          minLength: 1
 *          maxLength: 5
 *
 *      role:
 *        name: role
 *        schema:
 *          description: The role of the user
 *          type: string
 *          format: string
 *          $ref: "#/components/enums/rolesEnum"
 *
 *      createdAt:
 *        name: createdAt
 *        schema:
 *          description: The date of creation of the user
 *          type: string
 *          format: date-time
 *          readOnly: true
 *
 *      updatedAt:
 *        name: createdAt
 *        schema:
 *          description: The date of update of the user
 *          type: string
 *          format: date-time
 *          readOnly: true
 *
 *      activated:
 *        name: activated
 *        schema:
 *          description: The activation status of the user
 *          type: boolean
 *          format: boolean
 *          readOnly: true
 *
 *      favorites:
 *        name: favorites
 *        schema:
 *          description: The favorites of the user
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *                format: string
 *                readOnly: true
 *                description: The id of the listing
 *              date:
 *                type: string
 *                format: date-time
 *                readOnly: true
 *                description: The date when the listing was added to favorites
 *              _id:
 *                type: string
 *                format: string
 *                readOnly: true
 *                description: The unique id of the favorite object
 *
 */

/**
 * @swagger
 * components:
 *  userQueryParameters:
 *      id:
 *          allOf:
 *              - $ref: '#/components/userParameters/id'
 *              - in: query
 *      username:
 *          allOf:
 *              - $ref: '#/components/userParameters/username'
 *              - in: query
 *      firstName:
 *          allOf:
 *              - $ref: '#/components/userParameters/firstName'
 *              - in: query
 *      lastName:
 *          allOf:
 *              - $ref: '#/components/userParameters/lastName'
 *              - in: query
 *      email:
 *          allOf:
 *              - $ref: '#/components/userParameters/email'
 *              - in: query
 *      password:
 *          allOf:
 *              - $ref: '#/components/userParameters/password'
 *              - in: query
 *      refresh_token:
 *          allOf:
 *              - $ref: '#/components/userParameters/refresh_token'
 *              - in: query
 *      countryCode:
 *          allOf:
 *              - $ref: '#/components/userParameters/countryCode'
 *              - in: query
 *      phone:
 *          allOf:
 *              - $ref: '#/components/userParameters/phone'
 *              - in: query
 *      extension:
 *          allOf:
 *              - $ref: '#/components/userParameters/extension'
 *              - in: query
 *      activated:
 *          allOf:
 *              - $ref: '#/components/userParameters/activated'
 *              - in: query
 *      role:
 *          allOf:
 *              - $ref: '#/components/userParameters/role'
 *              - in: query
 */

/**
 * @swagger
 * components:
 *   userPathParameters:
 *       id:
 *         allOf:
 *             - $ref: '#/components/userParameters/id'
 *             - in: path
 *       username:
 *         allOf:
 *             - $ref: '#/components/userParameters/username'
 *             - in: path
 *       firstName:
 *         allOf:
 *             - $ref: '#/components/userParameters/firstName'
 *             - in: path
 *       lastName:
 *         allOf:
 *             - $ref: '#/components/userParameters/lastName'
 *             - in: path
 *       email:
 *         allOf:
 *             - $ref: '#/components/userParameters/email'
 *             - in: path
 *       password:
 *         allOf:
 *             - $ref: '#/components/userParameters/password'
 *             - in: path
 *       refresh_token:
 *         allOf:
 *             - $ref: '#/components/userParameters/refresh_token'
 *             - in: path
 *       countryCode:
 *         allOf:
 *             - $ref: '#/components/userParameters/countryCode'
 *             - in: path
 *       phone:
 *         allOf:
 *             - $ref: '#/components/userParameters/phone'
 *             - in: path
 *       extension:
 *         allOf:
 *             - $ref: '#/components/userParameters/extension'
 *             - in: path
 *       activated:
 *         allOf:
 *             - $ref: '#/components/userParameters/activated'
 *             - in: path
 *       role:
 *           allOf:
 *               - $ref: '#/components/userParameters/role'
 *               - in: path
 */

