import { config } from 'dotenv';
config();

import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Master',
      version: '1.0.0',
      description: 'API documentation Task Master',
    },
    servers: [
      {
        url: process.env.API_URL,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/**/*.docs.ts'], // This will include all .docs.ts files in the src folder and subfolders
};

export const swaggerConfig = swaggerJSDoc(options);
