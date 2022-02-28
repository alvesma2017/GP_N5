const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")
const categoriesContoller = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")

app.set('view engine','ejs')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

connection
.authenticate()
.then(()=>{
    console.log("conexão ok")

app.use("/", categoriesContoller)

app.use("/", articlesController)

}).catch((error)=>{
    console.log(error)
})

app.get("/",(req,res)=>{

    res.render('index')
})
app.listen(8080,()=>{
    console.log("servidor ok")
})

