const path = require('path');

//Sequelize configuration (file directory defined in .sequelizerc)
module.exports = {
    dialect: 'sqlite',
    dialectOptions: {
        useUTC: false,
        dateStrings: true,
        typeCast: true,
        timezone: "-03:00"
    },
    storage: path.resolve(__dirname, '..', 'database', 'GamesDB.sqlite'),
    define: {
        timestamps: true,
        timezone: '-3:00'
    }
};