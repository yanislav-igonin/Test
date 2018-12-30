const env = process.env.NODE_ENV;

const development = {
  port: parseInt(process.env.PORT, 10) || 3000,
};

const config = {
  development,
};

export default config[env];
