const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Game = require('../models/Game');
const User = require('../models/User');

const connection = new Sequelize(dbConfig);

Game.init(connection);
User.init(connection);

module.exports = connection;