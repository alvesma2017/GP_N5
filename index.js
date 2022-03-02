const express = require("express")
const app = express()
const session = require("express-session")
const bodyParser = require("body-parser")
const connection = require("./database/database")

const categoriesContoller = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")
const usersController = require("./users/usersController")

const Article = require("./articles/Article")
const Category = require("./categories/Category")
const User = require("./users/User")


app.set('view engine','ejs')

app.use(session({
    secret: "jkgtbsmdnddjsajkdasgdasdxbaslddhsçudasjd", cookie: {maxAge: 300000000000000000}

}))

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

connection
.authenticate()
.then(()=>{
    console.log("conexão ok")

}).catch((error)=>{
    console.log(error)
})

app.use("/", categoriesContoller)
app.use("/", articlesController)
app.use("/", usersController)

// app.get("/session", (req,res) =>{
//     req.session.ano = 2020
//     req.session.email = "alvesma@gmail.com"
//     res.send("sessão gerada")
// })
// app.get("/leitura", (req,res) => {
//     res.json({
//         ano: req.session.ano,
//         email: req.session.email
//     })
// })

app.get("/",(req,res)=>{
    Article.findAll({
        order: [['id', 'DESC']

    ],
    limit: 4
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories})
        })
        
    })
   
})

app.get("/:slug", (req,res) =>{
var slug = req.params.slug
Article.findOne({
    where: {
        slug: slug
    }
}).then(article => {
    if(article != undefined){
        Category.findAll().then(categories => {
            res.render("article", {article: article, categories: categories})
        })
    }else {
        res.redirect("/")
    }
}).catch( err => {
    res.redirect("/")
    })

})
app.get("/category/:slug", (req,res) =>{
    var slug = req.params.slug
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined){

            Category.findAll().then(categories => {
                res.render("index", {articles: category.articles, categories: categories})
            })

        }else {
            res.redirect("/")
        }
    }).catch(err =>{
        res.redirect("/")
    })

})

app.listen(8080,()=>{
    console.log("servidor ok")
})

