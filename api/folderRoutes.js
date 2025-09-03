import express from 'express';

import { createFile } from '#db/queries/files';
import { getFolder, getFolders } from '#db/queries/folders';

const router = express.Router();

/**
 * @method GET
 * @route /folders
 */
router.get('/', async (req, res, next) => {
  const folders = await getFolders();

  return res.send(folders);
});

/**
 * @method GET
 * @route /folders/:id
 */
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  const folder = await getFolder(id);

  if (!folder) return res.status(404).send('folder not found');

  return res.send(folder);
});

/**
 * @method POST
 * @route /folders/:id/files
 */
router.post('/:id/files', async (req, res) => {
  if (!req.body) return res.status(400).send('no body provided');
  if (!req.body.name || !req.body.size)
    return res.status(400).send('required fields not provided');

  const { id } = req.params;
  const folder = await getFolder(id);

  if (!folder) return res.status(404).send('folder not found');

  console.log({ ...req.body, folderId: id });

  const newFile = await createFile({ ...req.body, folderId: id });

  return res.status(201).send(newFile);
});

export default router;
