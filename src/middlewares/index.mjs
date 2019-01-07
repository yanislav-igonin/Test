import bodyParser from './bodyParser';
import errorHandler from './errorHandler';
import helmet from './helmet';
import queryParser from './queryParser';

const middlewares = [];

middlewares.push(helmet);
middlewares.push(bodyParser);
middlewares.push(errorHandler);
middlewares.push(queryParser);

export default middlewares;
