const authController = require('./controllers/AuthController')
const policies = require('./policies/AuthControlpolicy')
const bookController = require('./controllers/BookController')

module.exports = (app) =>
{
    app.post('/register',policies.register, authController.register)
    app.post('/login', authController.login)
    app.post('/books', bookController.storeBook)
    app.post('/burrow/:id', bookController.burrowBook)

    app.get('/books', bookController.getBooks)
    app.get('/books/:id', bookController.getBook)
    app.get('/burrow', bookController.getBurrows)
    app.get('/copy', bookController.getCopies)
    app.get('/burrowed/:id', bookController.getBurrowed)

    app.get('/byname/:id', bookController.getByName)
    app.get('/byauthor/:id', bookController.getByAuthor)
    app.get('/bytags/:id', bookController.getByTags)

    app.put('/books/:id', bookController.putBook)
    app.put('/burrow', bookController.returnBook)
    app.delete('/burrow/:id', bookController.deleteCopy)
}

/*
module.exports = (app) =>
{
    app.post('/login', authController.login)
}
*/
