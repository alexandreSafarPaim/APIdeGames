const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Game = require('../models/Game');

const connection = new Sequelize(dbConfig);

Game.init(connection);

module.exports = connection;