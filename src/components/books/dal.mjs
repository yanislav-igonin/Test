import db from '../../db';

const dal = {
  list: async (query) => {
    let sql = 'SELECT * FROM books';

    if (query.limit) {
      sql += ` LIMIT ${db.escape(query.limit)}`;
    }

    if (query.offset) {
      sql += ` OFFSET ${query.offset}`;
    }

    const [data] = await db.query(sql);

    return data;
  },

  create: async (fields) => {
    let date = new Date();
    date = `${date.getUTCFullYear()}-${`00${date.getUTCMonth() + 1}`.slice(
      -2,
    )}-${`00${date.getUTCDate()}`.slice(-2)}`;

    const sql = `
      INSERT INTO books(title, date, author, description, image)
      VALUES(?, ?, ?, ?, ?)
    `;

    const values = [
      db.escape(fields.title),
      date,
      db.escape(fields.author),
      db.escape(fields.description),
      db.escape(fields.image),
    ];

    const [result] = await db.query(sql, values);

    const [data] = await db.query('SELECT * FROM books WHERE id=?', result.insertId);

    return data[0];
  },
};

export default dal;
