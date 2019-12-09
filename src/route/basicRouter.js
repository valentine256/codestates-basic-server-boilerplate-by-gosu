import express from 'express';

import state from '../data/state';

const router = express.Router();

router.get('/', (req, res) => {
  console.log(`server received GET req from ip: ${req.ip}`);
  res.json(state);
})

router.post('/', (req, res) => {
  const reqData = req.body;
  console.log(`server received POST req from ip: ${req.ip}. data is ${reqData}`);
  state.storage.data.push(reaData)
  res.json(reqData)
})

export default router;