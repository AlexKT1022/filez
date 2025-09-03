import { faker } from '@faker-js/faker';

import db from '#db/client';
import { createFile } from './queries/files.js';
import { createFolder } from './queries/folders.js';

const generateFolder = async () => {
  const name = faker.system.commonFileName().split('.')[0];
  const newFolder = await createFolder(name);

  return newFolder;
};

const generateFile = async (folder) => {
  const name = faker.system.commonFileName();
  const size = faker.number.int({ min: 1, max: 2147483647 });
  const folderId = folder.id;
  const fileObj = {
    name,
    size,
    folderId,
  };

  await createFile(fileObj);
};

const seed = async () => {
  const numFolders = faker.number.int({ min: 3, max: 5 });
  const fileCount = [];

  for (let i = 0; i < numFolders; i++) {
    const newFolder = await generateFolder();
    const numFiles = faker.number.int({ min: 5, max: 10 });

    fileCount.push(numFiles);

    for (let j = 0; j < numFiles; j++) {
      await generateFile(newFolder);
    }
  }
};

await db.connect();
await seed();
await db.end();

console.log('🌱 Database seeded.');
