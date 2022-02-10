const SwaggerJSDoc = require('swagger-jsdoc');

module.exports.options = {
    customCssUrl: '/static/swagger-dark.css',
    customSiteTitle: "Rest-Inn API",
    customfavIcon: "/static/favicon.ico"
};

module.exports.swaggerDocs = SwaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Rest-Inn API',
            version: '1.0.1',
            description: 'OpenAPI based documentation for Rest-Inn API - Web422 by Rehman Ahmadzai',
        },
    },
    apis: [
        'constants/*.constants.js',  // Contains the enums for the constants
        'documentation/*/*.swagger.js',  // Contains the definitions for the objects in the API
        'routes/*.routes.js'], // files containing annotations as above
});