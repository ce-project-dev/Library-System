const authController = require('./controllers/AuthController')
const policies = require('./policies/AuthControlpolicy')
const bookController = require('./controllers/BookController')
const { requireAuth, checkadmin, checkuser } = require('./middleware/authMiddleware');

module.exports = (app) =>
{
    app.post('/register',policies.register, authController.register)    // all
    app.post('/login', authController.login)    // all
    app.post('/books', bookController.storeBook)    // all
    app.post('/burrow/:id', requireAuth, checkuser, bookController.burrowBook) /// user

    app.get('/books',  bookController.getBooks) // all
    app.get('/books/:id', bookController.getBook)   // all
    app.get('/burrow',requireAuth, bookController.getBurrows)   // login
    app.get('/copy', requireAuth, bookController.getCopies)// login
    app.get('/burrowed/:id', requireAuth, bookController.getBurrowed)// login
    app.get('/burrowedCopies/:id', requireAuth, bookController.getBurrowedCopies)
    app.get('/lenders',  bookController.getLenders)
    app.get('/lended/:id',  bookController.getLended)

    app.get('/byname/:id', bookController.getByName) // all
    app.get('/byauthor/:id', bookController.getByAuthor) // all
    app.get('/bytags/:id', bookController.getByTags) // all

    app.put('/books/:id', requireAuth, bookController.putBook) // login
    app.put('/burrow',requireAuth, bookController.restoreCopy)// login
    app.put('/drop',requireAuth,checkuser, bookController.dropBook) // user
    app.put('/lend/:id',requireAuth,checkadmin, bookController.lendCopy) //admin
    app.put('/return', requireAuth,checkadmin, bookController.returnBook) //admin
    app.get('/addCopy',requireAuth, checkadmin, bookController.addCopy)     //admin

    app.delete('/burrow/:id',requireAuth, checkadmin, bookController.deleteCopy) // admin
}

/*
module.exports = (app) =>
{
    app.post('/login', authController.login)
}
*/
