const env = process.env.NODE_ENV;

const development = {
  database: 'test-mysql',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'my-secret-pw',
  host: process.env.DB_HOST || 'localhost',
};

const config = {
  development,
};

export default config[env];
