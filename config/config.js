var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'yes-please'
    },
    port: 3000,
    db: 'mongodb://localhost/yes-please-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'yes-please'
    },
    port: 3000,
    db: 'mongodb://localhost/yes-please-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'yes-please'
    },
    port: 3000,
    db: 'mongodb://localhost/yes-please-production'
  }
};

module.exports = config[env];
