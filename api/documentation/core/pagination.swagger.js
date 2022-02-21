/**
 * @swagger
 *  definitions:
 *     Pagination:
 *         type: object
 *         description: Pagination object of the response
 *         properties:
 *             page:
 *                 type: integer
 *                 description: The current page number.
 *                 example: 1
 *                 minimum: 1
 *                 default: 1
 *             limit:
 *                 type: integer
 *                 description: The number of items per page.
 *                 example: 10
 *                 minimum: 1
 *                 default: 100
 *                 maximum: 100
 *             totalPages:
 *                 type: integer
 *                 description: The total number of pages.
 *                 example: 10
 *             count:
 *                 type: integer
 *                 description: The total number of items.
 *                 example: 100
 *
 *
 */