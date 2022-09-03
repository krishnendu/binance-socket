import express, { json, urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { eventsHandler, fetchBinance, getStatus} from './helpers.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.get('/status', getStatus);
app.get('/events', eventsHandler);

setTimeout(fetchBinance);

app.listen(PORT, () => {
  console.log(`Binance Socket Service listening at http://localhost:${PORT}`)
})