import db from '../../db';
import { sortDirectionIdentifier } from './helpers';

const dal = {
  list: async (query) => {
    let sql = `
      SELECT 
        b.id, 
        b.title, 
        b.date, 
        b.description, 
        b.image, 
        a.first_name AS author_first_name, 
        a.last_name AS author_last_name 
      FROM books AS b
      JOIN authors AS a ON b.author=a.id
    `;
    const values = [];

    if (query.sort) {
      sql += ' ORDER BY';
      query.sort.forEach((sortCriteria) => {
        sql += ` ?? ${sortDirectionIdentifier(sortCriteria[1])},`;
        values.push(sortCriteria[0]);
      });

      sql = sql.slice(0, -1);
    }

    if (query.limit) {
      sql += ' LIMIT ?';
      values.push(parseInt(query.limit, 10));
    }

    if (query.offset) {
      sql += ' OFFSET ?';
      values.push(parseInt(query.offset, 10));
    }

    const [data] = await db.query(sql, values);

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
      fields.title,
      date,
      fields.author,
      fields.description,
      fields.image,
    ];

    const [result] = await db.query(sql, values);

    const [data] = await db.query(
      `
      SELECT 
        b.id, 
        b.title, 
        b.date, 
        b.description, 
        b.image, 
        a.first_name AS author_first_name, 
        a.last_name AS author_last_name 
      FROM books AS b
      JOIN authors AS a ON b.author=a.id
      WHERE b.id=?`,
      result.insertId,
    );

    return data[0];
  },

  update: async (id, fields) => {
    let sql = 'UPDATE books SET';
    const values = [];

    if (fields.title) {
      sql += ' title=?,';
      values.push(fields.title);
    }

    if (fields.author) {
      sql += ' author=?,';
      values.push(fields.author);
    }

    if (fields.description) {
      sql += ' description=?,';
      values.push(fields.description);
    }

    if (fields.image) {
      sql += ' image=?,';
      values.push(fields.image);
    }

    sql = sql.slice(0, -1);

    sql += ' WHERE id=?';
    values.push(id);

    await db.query(sql, values);

    const [data] = await db.query(
      `
      SELECT 
        b.id, 
        b.title, 
        b.date, 
        b.description, 
        b.image, 
        a.first_name AS author_first_name, 
        a.last_name AS author_last_name 
      FROM books AS b
      JOIN authors AS a ON b.author=a.id
      WHERE b.id=?`,
      id,
    );

    return data[0];
  },
};

export default dal;
