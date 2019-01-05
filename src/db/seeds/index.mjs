/* eslint-disable */
import faker from 'faker';
import db from '../connection';
import { logger } from '../../modules';
import { app } from '../../config';

const seedAuthors = async conn => {
  let sql = 'INSERT INTO authors(first_name, last_name) VALUES';

  for (let i = 0; i < app.seeds.authors; i++) {
    sql += `\n("${faker.name.firstName()}", "${faker.name.lastName()}"),`;
  }

  const preparedSql = sql.slice(0, -1);

  await conn.query(preparedSql);
};

const seedBooks = async conn => {
  let sql =
    'INSERT INTO books(title, date, author, description, image) VALUES';

  for (let i = 0; i < app.seeds.books / 5; i++) {
    let date = new Date();
    date =
      date.getUTCFullYear() +
      '-' +
      ('00' + (date.getUTCMonth() + 1)).slice(-2) +
      '-' +
      ('00' + date.getUTCDate()).slice(-2);

    sql += `\n("${faker.random.words()}", "${date}", ${Math.floor(
      Math.random() * app.seeds.authors,
    ) + 1}, "${faker.random.words()}", ${Math.floor(
      Math.random() * app.seeds.images,
    ) + 1}),`;
  }

  const preparedSql = sql.slice(0, -1);

  await conn.query(preparedSql);
};

db.getConnection()
  .then(async conn => {
    await conn.query(`
      CREATE TABLE IF NOT EXISTS authors (
        id INT NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
      )`);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS books (
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        author INT NOT NULL,
        description VARCHAR(1000),
        image VARCHAR(300) NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (author) REFERENCES authors(id)
      )`);

    await seedAuthors(conn);
    logger.info('authors seeding completed');

    // Multiple seeds for avoiding EPIPE error
    await seedBooks(conn);
    await seedBooks(conn);
    await seedBooks(conn);
    await seedBooks(conn);
    await seedBooks(conn);
    logger.info('books seeding completed');
    process.kill(process.pid, 'SIGTERM');
  })
  .catch(err => {
    logger.error('message:', err.message);
    logger.error(err.stack);

    process.exit(1);
  });
