const sequelize = require("sequelize")
const connection = require("../database/database")
const Category = require("../categories/Category")

const Article = connection.define('articles',{
    title:{
        type: sequelize.STRING,
        allowNull: false
    },slug: {
        type: sequelize.STRING,
        alowNull: false
    },
    body:{
        type: sequelize.TEXT,
        alowNull: false
    }
 
})

Category.hasMany(Article) //uma categoria possui varios artigos
Article.belongsTo(Category) // um artigo pertence a uma categoria

//Article.sync({force: true})

module.exports = Article