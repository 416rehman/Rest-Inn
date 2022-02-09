const SwaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Rest-Inn API',
            version: '1.0.0',
            description: 'Swagger documentation for Rest-Inn API',
        },
    },
    apis: [
        'documentation/swaggerDefinitions.js',  // Contains the definitions for the objects in the API
        'routes/*.routes.js'], // files containing annotations as above
};

const openapiSpecification = SwaggerJSDoc(options);

module.exports = openapiSpecification;