const env = process.env.NODE_ENV;

const development = {
  database: 'dumpach',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '123456',
  options: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DEV_DB_PORT, 10) || 3306,
    dialect: 'postgres',
    logging: false,
  },
};

const config = {
  development,
};

module.exports = config[env];
