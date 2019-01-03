const env = process.env.NODE_ENV;

const development = {
  port: parseInt(process.env.PORT, 10) || 3000,
  seeds: {
    authors: 100000,
    books: 100000,
    images: 100000,
  },
};

const config = {
  development,
};

export default config[env];
