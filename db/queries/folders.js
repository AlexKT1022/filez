import db from '#db/client';

export const getFolders = async () => {
  const sql = `
    SELECT * 
    FROM folders
  `;
  const { rows } = await db.query(sql);

  return rows;
};

export const getFolder = async (id) => {
  const sql = `
    SELECT *,
    (
      SELECT json_agg(files)
      FROM files
      WHERE folder_id = folders.id
    ) AS files
    FROM folders
    WHERE id = $1
  `;
  const { rows } = await db.query(sql, [id]);

  return rows[0];
};

export const createFolder = async (name) => {
  const sql = `
    INSERT INTO folders(name)
    VALUES($1)
    RETURNING *
  `;
  const { rows } = await db.query(sql, [name]);

  return rows[0];
};
