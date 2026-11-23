const Sequelize = require('sequelize');
const User = require('./user');
const Course = require('./course');
const Assignment = require('./assignment');
const Activity = require('./activity');
const Certificate = require('./certificate');

const config = require('../config/config').development;

const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

const db = {
  sequelize,
  User,
  Course,
  Assignment,
  Activity,
  Certificate,
};

User.init(sequelize);
Course.init(sequelize);
Assignment.init(sequelize);
Activity.init(sequelize);
Certificate.init(sequelize);

User.associate(db);
Course.associate(db);
Assignment.associate(db);
Activity.associate(db);
Certificate.associate(db);

module.exports = db;