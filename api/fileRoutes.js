import express from 'express';

import { getFiles } from '#db/queries/files';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const files = await getFiles();

  res.send(files);
});

export default router;
