import express from 'express';
import { getClients, addClient } from '../models/client.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const clients = await getClients();
  res.json(clients);
});

router.post('/', async (req, res) => {
  const id = await addClient(req.body);
  res.json({ id });
});

export default router;
