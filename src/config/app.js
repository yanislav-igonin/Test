const path = require('path');

const env = process.env.NODE_ENV;

const development = {
  port: parseInt(process.env.PORT, 10) || 3000,
  uploads: {
    source: path.join(__dirname, '../uploads/source'),
    thumb: path.join(__dirname, '../uploads/thumb'),
  },
  seeding: {
    threadsPerBoard: 50,
    postsPerThread: 250,
  },
};

const config = {
  development,
};

module.exports = config[env];
