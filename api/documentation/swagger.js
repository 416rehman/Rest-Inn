const SwaggerJSDoc = require('swagger-jsdoc');

const options = {
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
};

module.exports = SwaggerJSDoc(options);