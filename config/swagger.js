import swaggerJsdoc from 'swagger-jsdoc';
const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Gateways API',
      version: '0.1.0',
      description:
        'REST service (JSON/HTTP) for storing information about gateways and their associated devices, data is stored in MongoDB database',
      license: 'ISC',
      contact: {
        name: 'Orlando Pantoja Ortega',
        email: 'orlandopanto97@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./routes/*.js']
};
const specs = swaggerJsdoc(options);
export default specs;
