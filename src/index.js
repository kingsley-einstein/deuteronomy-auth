import express from 'express';
import env from './env';

const { server } = env;
const app = express();

app.listen(server[process.env.NODE_ENV], () => {
  console.log(`Server running on port ${server[process.env.NODE_ENV]}`);
});
