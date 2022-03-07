/**
 * @swagger
 * components:
 *   securitySchemes:
 *     accessToken:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Access token - Use this to access the protected API endpoints. You can generate a new access token at /auth/token
 *     refreshToken:
 *       type: http
 *       description: Refresh token - Use this to get a new access token from /auth/token
 *       scheme: bearer
 *       bearerFormat: JWT
 */