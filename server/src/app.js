
const port = 3001

const express = require('express')
var bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

//app.use(morgan('combine'))
app.use(bodyParser.json())
app.use(cors())

const {sequelize} = require('./models')



require('./routes')(app)

sequelize.sync()
.then(() => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
})










  app.get('/showusers', (req, res) => {
    var users = sequelize.query("SELECT * FROM `users`", { type: sequelize.QueryTypes.SELECT})
  .then(function(users) {
    res.send(JSON.stringify(users))
  })
  })

  app.get('/showbooks', (req, res) => {
    var books = sequelize.query("SELECT * FROM `books`", { type: sequelize.QueryTypes.SELECT})
    .then(function(books) {
      console.log(books)
      res.send(JSON.stringify(books))
    })

  })

  app.get('/showcopies', (req, res) => {
    var copies = sequelize.query("SELECT * FROM `copies`", { type: sequelize.QueryTypes.SELECT})
    .then(function(users) {
      res.send(JSON.stringify(copies))
    })
  })

  app.get('/showburrows', (req, res) => {
    var burrow = sequelize.query("SELECT * FROM `burrows`", { type: sequelize.QueryTypes.SELECT})
    .then(function(burrow) {
      res.send(JSON.stringify(burrow))
    })
  })


  app.get('/showtags', (req, res) => {
    var tags = sequelize.query("SELECT * FROM `tags`", { type: sequelize.QueryTypes.SELECT})
    .then(function(tags) {
      res.send(JSON.stringify(tags))
    })
  })




