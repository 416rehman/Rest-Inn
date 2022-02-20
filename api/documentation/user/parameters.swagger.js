
/**
 * @swagger
 * components:
 *   userParameters:
 *      id:
 *        name: id
 *        in: path
 *        readOnly: true
 *        description: The id of the object
 *        schema:
 *          type: string
 *          format: string
 *
 *      username:
 *        name: username
 *        description: The username of the object
 *        schema:
 *          type: string
 *          minLength: 3
 *          maxLength: 30
 *
 *      firstName:
 *        name: firstName
 *        description: The first name of the user
 *        schema:
 *          type: string
 *          format: string
 *          minLength: 3
 *          maxLength: 255
 *          pattern: ^[a-z A-Z\-.]+$
 *
 *      lastName:
 *        name: lastName
 *        description: The last name of the user
 *        schema:
 *          type: string
 *          format: string
 *          minLength: 3
 *          maxLength: 255
 *          pattern: ^[a-z A-Z\-.]+$
 *
 *      email:
 *        name: email
 *        description: The obfuscated email of the user
 *        schema:
 *          type: string
 *          format: string
 *          minLength: 3
 *          maxLength: 255
 *
 *      password:
 *        name: password
 *        description: The password of the user
 *        schema:
 *          type: string
 *          format: string
 *          minLength: 8
 *          maxLength: 255
 *
 *      refreshToken:
 *        name: refreshToken
 *        description: The refresh token of the user
 *        schema:
 *          type: string
 *          format: string
 *          minLength: 8
 *          maxLength: 512
 *        readOnly: true
 *
 *      countryCode:
 *        name: countryCode
 *        description: The country code of the user's phone number
 *        schema:
 *          type: string
 *          format: string
 *          $ref: "#/components/enums/countryCodesEnum"
 *
 *      phone:
 *        name: phone
 *        description: The phone of the user
 *        schema:
 *          type: string
 *          format: string
 *          minLength: 10
 *          maxLength: 10
 *
 *      extension:
 *        name: extension
 *        description: The extension of the user's phone number
 *        schema:
 *          type: string
 *          format: string
 *          minLength: 1
 *          maxLength: 5
 *
 *      role:
 *        name: role
 *        description: The role of the user
 *        schema:
 *          type: string
 *          format: string
 *          $ref: "#/components/enums/rolesEnum"
 *
 *      createdAt:
 *        name: createdAt
 *        description: The date of creation of the user
 *        schema:
 *          type: string
 *          format: date-time
 *          readOnly: true
 *
 *      updatedAt:
 *        name: createdAt
 *        description: The date of update of the user
 *        schema:
 *          type: string
 *          format: date-time
 *          readOnly: true
 *
 *      activated:
 *        name: activated
 *        description: The activation status of the user
 *        schema:
 *          type: boolean
 *          format: boolean
 *          readOnly: true
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

