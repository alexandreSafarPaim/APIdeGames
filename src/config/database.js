const path = require('path');

module.exports = {
    dialect: 'sqlite',
    dialectOptions: {
        // useUTC: false, //for reading from database
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