import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import chatRouter from './routes/chat.js';

import { GoogleGenAI } from '@google/genai';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/chat', chatRouter);

app.listen(3000, () => {
  console.log('Serveur lancé sur http://localhost:3000');
});
