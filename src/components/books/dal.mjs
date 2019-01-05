import db from '../../db';

const dal = {
  list: async (query) => {
    let sql = 'SELECT * FROM books';

    if (query.limit) {
      sql += ` LIMIT ${query.limit}`;
    }

    if (query.offset) {
      sql += ` OFFSET ${query.offset}`;
    }

    const data = await db.query(sql);

    return data[0];
  },
};

export default dal;
