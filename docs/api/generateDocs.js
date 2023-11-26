const swaggerJSDoc = require('swagger-jsdoc');
const fs = require('fs');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Metrics Lambda Function API',
      version: '1.0.0',
    },
  },
  apis: ['./docs/api/openapi-spec.yml'], // Update this path to point to your OpenAPI specification file
};

const swaggerSpec = swaggerJSDoc(options);

// Output the generated Swagger specification as JSON
fs.writeFileSync('./docs/api/swagger.json', JSON.stringify(swaggerSpec, null, 2));
