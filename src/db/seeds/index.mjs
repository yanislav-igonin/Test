/* eslint-disable */
import faker from 'faker';
import connection from '../connection';
import { logger } from '../../modules';
import { app } from '../../config';

const seedAuthors = async conn => {
  let sqlStatement = 'INSERT INTO authors(first_name, last_name) VALUES';

  for (let i = 0; i < app.seeds.authors; i++) {
    sqlStatement += `\n("${faker.name.firstName()}", "${faker.name.lastName()}"),`;
  }

  const preparedSqlStatement = sqlStatement.slice(0, -1);

  await conn.query(preparedSqlStatement);
};

const seedImages = async conn => {
  let sqlStatement = 'INSERT INTO images(url) VALUES';

  for (let i = 0; i < app.seeds.authors / 2; i++) {
    sqlStatement += `\n("${faker.image.image()}"),`;
  }

  const preparedSqlStatement = sqlStatement.slice(0, -1);

  await conn.query(preparedSqlStatement);
};

const seedBooks = async conn => {
  let sqlStatement =
    'INSERT INTO books(title, date, author, description, image) VALUES';

  for (let i = 0; i < app.seeds.books / 5; i++) {
    let date = new Date();
    date =
      date.getUTCFullYear() +
      '-' +
      ('00' + (date.getUTCMonth() + 1)).slice(-2) +
      '-' +
      ('00' + date.getUTCDate()).slice(-2);

    sqlStatement += `\n("${faker.random.words()}", "${date}", ${Math.floor(
      Math.random() * app.seeds.authors,
    ) + 1}, "${faker.random.words()}", ${Math.floor(
      Math.random() * app.seeds.images,
    ) + 1}),`;
  }

  const preparedSqlStatement = sqlStatement.slice(0, -1);

  await conn.query(preparedSqlStatement);
};

connection().then(async conn => {
  try {
    await conn.query(`
      CREATE TABLE IF NOT EXISTS authors (
        id INT NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
      )`);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS images (
        id INT NOT NULL AUTO_INCREMENT,
        url VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
      )`);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS books (
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        author INT NOT NULL,
        description VARCHAR(1000),
        image INT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (author) REFERENCES authors(id),
        FOREIGN KEY (image) REFERENCES images(id)
      )`);

    await seedAuthors(conn);
    logger.info('authors seeding completed');

    // Multiple seeds for avoiding EPIPE error
    await seedImages(conn);
    await seedImages(conn);
    logger.info('images seeding completed');

    // Multiple seeds for avoiding EPIPE error
    await seedBooks(conn);
    await seedBooks(conn);
    await seedBooks(conn);
    await seedBooks(conn);
    await seedBooks(conn);
    logger.info('books seeding completed');
    process.kill(process.pid, 'SIGTERM');
  } catch (err) {
    console.log(err);

    process.exit(1);
  }
});
