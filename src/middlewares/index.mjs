import bodyParser from './bodyParser';
import errorHandler from './errorHandler';
import helmet from './helmet';

const middlewares = [];

middlewares.push(helmet);
middlewares.push(bodyParser);
middlewares.push(errorHandler);

export default middlewares;
