import express from 'express';

import fileRoutes from '#api/fileRoutes';
import folderRoutes from '#api/folderRoutes';
import errorHandler from '#middleware/errorHandler';
import logger from '#middleware/logger';

const app = express();

app.use(express.json());

app.use(logger);

app.use('/files', fileRoutes);
app.use('/folders', folderRoutes);

app.get('/', (req, res, next) => {
  return res.send('successfully connected');
});

app.use(errorHandler);

export default app;
