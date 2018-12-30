import Koa from 'koa';
import { app } from './config';
import { logger } from './modules';
import middlewares from './middlewares';

const server = new Koa();

middlewares.forEach(middleware => server.use(middleware));
logger.info('server - middlewares connection - success');

server.listen(app.port, () => {
  logger.info('server - online');
  logger.info('all systems nominal');
});
