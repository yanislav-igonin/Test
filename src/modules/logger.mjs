import pino from 'pino';

const env = process.env.NODE_ENV;

const logger = {
  development: pino({ timestamp: false, level: 'debug', prettyPrint: true }),
};

export default logger[env];
