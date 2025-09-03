import db from '#db/client';

export const getFiles = async () => {
  const sql = `
    SELECT files.*, folders.name AS folder_name
    FROM files
    JOIN folders
    ON folders.id = files.folder_id
  `;
  const { rows } = await db.query(sql);

  return rows;
};

export const createFile = async ({ name, size, folderId }) => {
  const sql = `
    INSERT INTO files(name, size, folder_id)
    VALUES($1, $2, $3)
    RETURNING *
  `;
  const { rows } = await db.query(sql, [name, size, folderId]);

  return rows[0];
};
