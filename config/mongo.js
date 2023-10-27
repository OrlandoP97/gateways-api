import dotenv from 'dotenv';
import { connect } from 'mongoose';

dotenv.config();

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

const databaseUrl = `mongodb://${dbHost}:${dbPort}/${dbName}`;
// Connect to MongoDB
connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Database connected'))
  .catch((error) => {
    throw error;
  });
