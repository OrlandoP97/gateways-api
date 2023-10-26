import './config/mongo.js';
import express from 'express';
import bp from 'body-parser';
import gatewayRouter from './routes/gateway.js';

const app = express();

/* Middlewares */
app.use(bp.json());
app.use('/gateways', gatewayRouter);

/* Start server */
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default app;
