// server/src/server.ts
import dotenv from 'dotenv';
import express from 'express';

const app = express();

dotenv.config(); // Load environment variables from .env file
const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
