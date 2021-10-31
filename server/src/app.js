
const port = 3001

const express = require('express')
var bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const cookieSession = require('cookie-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 15*60*1000,
  max:100
})

const app = express()

//app.use(morgan('combine'))
app.use(bodyParser.json())
app.use(cors())

const {sequelize} = require('./models')

app.use(limiter)

app.use(cookieSession({
    name: 'mysession',
    keys: ['vueauthrandomkey'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(passport.initialize());
app.use(passport.session());

require('./routes')(app)
//{force: true}
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
    .then(function(copies) {
      console.log("copies: " +copies)
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




