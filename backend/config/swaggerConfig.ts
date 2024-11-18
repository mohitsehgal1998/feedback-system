// feedback/backend/config/swaggerConfig.ts

import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Feedback API',
    version: '1.0.0',
    description: 'This is the API documentation for the Feedback project',
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT", // Optional: specifies that this is a JWT token
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
  servers: [
    {
      url: 'http://localhost:5000', // Your API base URL
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['**/routes/*.ts'], // Path to the API docs (in your case, it's the routes files)
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
