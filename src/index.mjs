import Koa from 'koa';
import { app } from './config';
import { logger } from './modules';
import middlewares from './middlewares';
import db from './db';

const server = new Koa();

middlewares.forEach(middleware => server.use(middleware));
logger.info('server - middlewares connection - success');

db
  .getConnection()
  .then(() => {
    logger.info('database - online');

    server.listen(app.port, () => {
      logger.info('server - online');
      logger.info('all systems nominal');
    });
  })
  .catch((err) => {
    logger.error('message:', err.message);
    logger.error(err.stack);
    process.exit(1);
  });
