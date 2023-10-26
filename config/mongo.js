import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { connect } from 'mongoose';

const env = dotenv.config();
dotenvExpand.expand(env);
// Connect to MongoDB
connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Database connected'))
  .catch((error) => {
    throw error;
  });
