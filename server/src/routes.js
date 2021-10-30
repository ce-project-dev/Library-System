const authController = require('./controllers/AuthController')
const policies = require('./policies/AuthControlpolicy')
const bookController = require('./controllers/BookController')
const { requireAuth, checkadmin, checkuser } = require('./middleware/authMiddleware');

module.exports = (app) =>
{
    app.post('/register',policies.register, authController.register)
    app.post('/login', authController.login)
    app.post('/books', bookController.storeBook)
    app.post('/burrow/:id', requireAuth, checkuser, bookController.burrowBook)

    app.get('/books',  bookController.getBooks)
    app.get('/books/:id', bookController.getBook)
    app.get('/burrow',requireAuth, bookController.getBurrows)
    app.get('/copy', requireAuth, bookController.getCopies)
    app.get('/burrowed/:id', requireAuth, bookController.getBurrowed)
    app.get('/burrowedCopies/:id', requireAuth, bookController.getBurrowedCopies)

    app.get('/byname/:id', bookController.getByName)
    app.get('/byauthor/:id', bookController.getByAuthor)
    app.get('/bytags/:id', bookController.getByTags)

    app.put('/books/:id', requireAuth, bookController.putBook)
    app.put('/burrow',requireAuth, bookController.restoreCopy)
    app.put('/drop',requireAuth,checkuser, bookController.dropBook)
    app.put('/lend/:id',requireAuth, bookController.lendCopy)
    app.put('/return', requireAuth, bookController.returnBook)
    app.get('/addCopy',requireAuth, bookController.addCopy)

    app.delete('/burrow/:id',requireAuth, bookController.deleteCopy)
}

/*
module.exports = (app) =>
{
    app.post('/login', authController.login)
}
*/
