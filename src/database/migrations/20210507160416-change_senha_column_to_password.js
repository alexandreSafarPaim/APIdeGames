'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {

        return queryInterface.renameColumn('users', 'senha', 'password');

    },

    down: async(queryInterface, Sequelize) => {

        return queryInterface.renameColumn('users', 'password', 'senha');
    }
};