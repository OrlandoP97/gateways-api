import './config/mongo.js';
import express from 'express';
import bp from 'body-parser';
import gatewayRouter from './routes/gateway.js';
import swaggerUi from 'swagger-ui-express';
import specs from './config/swagger.js';

const app = express();

/* Middlewares */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(bp.json());
app.use('/gateways', gatewayRouter);

/* Start server */
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
export default app;
