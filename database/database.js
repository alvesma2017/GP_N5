const sequelize = require("sequelize")

const connection = new sequelize('guiapress','root','wcawca#023',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"

})
module.exports = connection