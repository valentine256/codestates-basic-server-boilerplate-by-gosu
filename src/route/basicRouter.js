import express from 'express';

import storage from '../data/storage';

const router = express.Router();

router.get('/', (req, res) => {
  console.log(`server received GET req from ip: ${req.ip}`);
  res.json(storage);
})

router.post('/', (req, res) => {
  const reqData = req.body;
  console.log(`server received POST req from ip: ${req.ip}. data is ${reqData}`);
  storage.storage.data.push(reaData)
  res.json(reqData)
})

export default router;