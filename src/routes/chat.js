import { Router } from 'express';
import { askGemini } from '../services/gemini.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const message = req.body.message;

    const answer = await askGemini(message);

    res.json({
      answer: answer.answer,
    });
  } catch (error) {
    console.log(error);

    if (error.status === 429) {
      res.status(429).json({
        answer: 'Le quota Gemini est atteint, réessaie plus tard.',
      });
    } else {
      res.status(500).json({
        answer: 'Une erreur est survenue avec Gemini.',
      });
    }
  }
});

export default router;
