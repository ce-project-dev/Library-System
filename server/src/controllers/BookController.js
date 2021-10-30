const {User, Book, Copy, Burrow, Tag} = require('../models')
const config = require('../config/config')
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');



module.exports = {
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async addCopy(req, res)
{   
    console.log("headers :" + JSON.stringify(req.headers.jwt));
     const token = req.headers.jwt;
    jwt.verify(token, config.authentication.jwtSecret , (err, decodedToken) => {
      if (err) 
      {
        console.log(err.message);
      } 
      else 
      {
        console.log("token " +  JSON.stringify(decodedToken.role));
        //next();
      }
    });
   
     try
         {           
            res.send({lended: "copy"}) 
         }
    catch(err)
          { 
            res.send({lended: copy}) 
             console.log(err)
         }
},

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async getBurrowedCopies(req, res)
{   
    console.log("bodyyyyyyyyyyy: " + (JSON.parse(req.params.id).userID))
    const conditions = JSON.parse(req.params.id)
     try
         {
            const copy = await  Copy.findAll({where: {bookID: conditions.bookID, userID: conditions.userID, lended: true} })  
            res.send({lended: copy}) 
         }
    catch(err)
          { 
            //res.send({lended: copy}) 
             console.log(err)
         }
}
,

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async lendCopy(req, res)
{       
    console.log("lend: "+ req.params.id )
    try
    {
         const copy = await Copy.update({lended: true},{ where: { id: req.params.id } } )
         res.send({lend: copy})
    }

    catch(error)
    {
        console.log("Lending error: "+ error)
        res.status(500).send({error: "error occured when lending the book"})
    }
}
    
,

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async dropBook(req, res)
   {
         try
            {

             console.log("copy: "+ req.body.bookID)
             console.log("user: "+ req.body.userID)
             

                const book = await Burrow.update(
                    {returned: true},
                    { where: { bookID: req.body.bookID, userID: req.body.userID, returned: false} }
                  )

                await Copy.update(
                    {available: true, userID: null},
                    { where: { bookID: req.body.bookID, userID: req.body.userID, available: false} }
                  )

                console.log("book dropped from bucket")
                res.send({message: "book dropped from bucket"})
            }
        catch(err)
            {
                console.log("Book drop error "+ err)
                res.status(500).send({error: "error occured when droppin the book"})
            }
   },

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async getBurrowed(req, res)
   {

      let ids = []
      let dueDates = []
                    async function getBurrows() 
                       {  
                       
                  
                       burrows = await Burrow.findAll({where: {userID: req.params.id,returned: false} })

                           
                       
                        burrows.forEach(function(burrow)
                                      {    
                                          console.log("USER ID: "+ req.params.id)
                                          var obj = {id: burrow.dataValues.bookID}
                                          console.log( JSON.stringify(burrow.dataValues.inDate) )
                                          dueDates.push( ((JSON.stringify(burrow.dataValues.inDate)).split('T')[0]).split('"')[1])
                                          ids.push(obj)
                                                             
                                      });
                      
                      //const results = await  Book.findAll({where: { [Op.or]: conditions2}, distinct: 'id'})
                      console.log("IIIIIIIIIIIIIIIIIDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
                      console.log(ids)

                      return Promise.resolve(ids);
                    }
                    getBurrows().then(
                     async (ids) => 
                     {

                       let results = null
                        try
                        {
                             results = await  Book.findAll({where: { [Op.or]: ids}, distinct: 'id'})
                             console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
                             console.log(ids)
                        }
                        catch(error)
                        {
                          console.log("hereee: "+ error)
                        }

                          res.send({results: results, due: dueDates })

                      /*
                        try{
                                var books = await  Book.findAll({where: { 
                                [Op.or]: ['title', 'author'].map(key =>  ({
                                    [key]: {[Op.like]: `%${req.params.id}%`}
                                }))
                            }
                        })

                      t3 = 0
                      books.forEach(function(book)
                                    {    
                                        var obj = {id: book.id}
                                        ids.push(obj)
                                        t3++                      
                                    });

                        const results = await  Book.findAll({where: { [Op.or]: ids}, distinct: 'id'})
                        
                        res.send({books: results})
                        }
                        catch(err)
                        {
                            console.log(err)
                        }
                        */
                        
                      }
                    )
   },

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async getByTags(req, res)
{   
    const tags = (req.params.id).split(" ");

    const conditions1 = []
    const conditions2 = []
    const conditions3 = []

async function getIDS() 
       {  
        t1 = 0
        tags.forEach( function(tag) 
        {
            conditions1[t1] = {tag: tag}
            t1++
        });
  
      var books = await  Tag.findAll({where: { [Op.or]: conditions1}, distinct: 'bookID'})

      t2 = 0
      books.forEach(function(book)
                    {    
                        conditions2[t2] = {id: book.bookID}
                        t2++                      
                    });  
      
      //const results = await  Book.findAll({where: { [Op.or]: conditions2}, distinct: 'id'})

      return Promise.resolve(conditions2);
    }
    getIDS().then(
     async (ids) => 
     {  
        console.log(ids)
        try{
                var books = await  Book.findAll({where: { 
                [Op.or]: ['title', 'author'].map(key =>  ({
                    [key]: {[Op.like]: `%${req.params.id}%`}
                }))
            }
        })

      t3 = 0
      books.forEach(function(book)
                    {    
                        var obj = {id: book.id}
                        ids.push(obj)
                        t3++                      
                    });

        const results = await  Book.findAll({where: { [Op.or]: ids}, distinct: 'id'})
        
        res.send({books: results})
        }
        catch(err)
        {
            console.log(err)
        }
        
      }
    )



},

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async getByName(req, res)
{
     const name = req.params.id
     const results = await  Book.findAll({where: {title: name }})
     res.send({books: results})
},

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async getByAuthor(req, res)
{
     const author = req.params.id
     const results = await  Book.findAll({where: {author: author }})
     res.send({books: results})
},

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async getBurrows(req, res)
   {
        try
        {
            const books = await Burrow.findAll({
                limit: 10
            })
            res.send(books)
        }
    catch(err)
        {
            console.log("Fetch Burrows books error "+ err)
            res.status(500).send({error: "error occured when fetching burrowed books"})
        }
   },

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async deleteCopy(req, res)
{
    console.log("Delete: " + JSON.parse(req.params.id))
    const copy = JSON.parse(req.params.id)
    try
    {   
        const book = req.body.book
        console.log("********************************************************book: "+ (req.body.copies))

        const deleteed = await Copy.destroy({ where: {id:  copy.copyID} })
        
        if(deleteed)
        {
            const deletedBook = await Book.update({copies: copy.copies},{ where: { id: copy.bookID} })
            //console.log(book)
            console.log("deleted")
            res.send({deleted: book})
        }
        else
        {
           
        console.log("deleted")
        res.send({err: "deletion failed"})
        }

    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({error: "error occured when deleting a copy"})
    }

},

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async restoreCopy(req, res)
   {
        try
            {

             //console.log("copy: "+ req.body.bookID)
             //console.log("user: "+ req.body.userID)
             

                const book = await Burrow.update(
                    {returned: true},
                    { where: { bookID: req.body.bookID, userID: req.body.userID, returned: false, copyID: req.body.copyID} }
                  )

                await Copy.update(
                    {available: true, userID: null},
                    { where: { id: req.body.copyID} }
                  )

                console.log("book returned: ")
                res.send({message: "book returned"})
            }
        catch(err)
            {
                console.log("Burrow return error "+ err)
                res.status(500).send({error: "error occured when returning the book"})
            }
   },

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async returnBook(req, res)
   {
        try
            {

             //console.log("copy: "+ req.body.bookID)
             //console.log("user: "+ req.body.userID)
             

                const book = await Burrow.update(
                    {returned: true},
                    { where: { bookID: req.body.bookID, userID: req.body.userID, returned: false, copyID: req.body.copyID} }
                  )

                await Copy.update(
                    {available: true, userID: null, lended: false},
                    { where: { id: req.body.copyID} }
                  )

                console.log("book returned: ")
                res.send({message: "book returned"})
            }
        catch(err)
            {
                console.log("Burrow return error "+ err)
                res.status(500).send({error: "error occured when returning the book"})
            }
   },
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async burrowBook(req, res)
   {
        try
            {
                const copy = req.params.id
                const user = req.body.userID
                const bookID = req.body.bookID

                console.log("UserID: "+ user)
                console.log("CopyID: "+ copy)
                console.log("BookID: "+ bookID)

                const burrow = await Burrow.create({copyID: copy, bookID: bookID, userID: user, inDate: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000)})

                await Copy.update(
                    {available: false, userID: user},
                    { where: { id: copy} }
                  )


                console.log("book burrowed: "+ burrow)
                res.send(burrow)
            }
        catch(err)
            {
                console.log("Burrow books error "+ err)
                res.status(500).send({error: "error occured when burrowing the book"})
            }
   },

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   async getCopies(req, res)
   {
        try
            {
                const books = await Copy.findAll({
                    limit: 10
                })
                res.send(books)
            }
        catch(err)
            {
                console.log("Fetch copies error "+ err)
                res.status(500).send({error: "error occured when fetching copies"})
            }
   },

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   async getBooks(req, res)
   {
        try
            {
                let books = null

                if(req.query.search)
                {   
                    console.log("search: " + req.query.search)
                     const tags = (req.query.search).split(" ")
                    const conditions1 = []
                    const conditions2 = []
                    const conditions3 = []

                async function getIDS() 
                       { 
                        t1 = 0
                        tags.forEach( function(tag) 
                        {
                            conditions1[t1] = {tag: tag}
                            t1++
                        });
                  
                      var books = await  Tag.findAll({where: { [Op.or]: conditions1}, distinct: 'bookID'})

                      t2 = 0
                      books.forEach(function(book)
                                    {    
                                        conditions2[t2] = {id: book.bookID}
                                        t2++                      
                                    });  
                      
                      //const results = await  Book.findAll({where: { [Op.or]: conditions2}, distinct: 'id'})

                      return Promise.resolve(conditions2);
                    }
                    getIDS().then(
                     async (ids) => 
                     {  
                        console.log(ids)
                        try{
                                var books = await  Book.findAll({where: { 
                                [Op.or]: ['title', 'author'].map(key =>  ({
                                    [key]: {[Op.like]: `%${req.query.search}%`}
                                }))
                            }
                        })

                      t3 = 0
                      books.forEach(function(book)
                                    {    
                                        var obj = {id: book.id}
                                        ids.push(obj)
                                        t3++                      
                                    });

                        const results = await  Book.findAll({where: { [Op.or]: ids}, distinct: 'id'})

                
                        res.send(results)
                        }
                        catch(err)
                        {
                            console.log(err)
                        }
                        
                
                      }
                    )
                }
                else
                {
                    books = await Book.findAll({ limit: 10 })
                    res.send(books)
                }
                
               
            }
        catch(err)
            {
                console.log("Fetch books error "+ err)
                res.status(500).send({error: "error occured when fetching books"})
            }
   },

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   async storeBook(req, res)
   {
        try
        {   
            console.log(req.body)
            const tags = (req.body.tags).split(",");
            
            const book = await Book.create(req.body)

            const id = book.id
            const title = book.title
            const copies = book.copies


            for(let i = 0; i < copies; i++)
            {
                try
                {
                    const copy = await Copy.create({bookID: id, copyID:  JSON.stringify(i + 1) , userID: null})
                    console.log("store a copy: "+ copy)
                }
            catch(err)
                {
                    console.log("Store book error :" + err)
                    //res.status(500).send({error: "error occured when storing a book"})
                }
            }

            tags.forEach(async function(tag) {

                                 try
                                    {
                                        const entry = await Tag.create({bookID: id, tag:tag })
                                        console.log("store a tag: "+ entry.tag)
                                    }
                                catch(err)
                                    {
                                        console.log("Store tag error :" + err)
                                        //res.status(500).send({error: "error occured when storing a book"})
                                    }
    
                        });
            console.log("store a books: "+ book)
            res.send(book)
        }
    catch(err)
        {
            console.log("Store book error :" + err)
            res.status(500).send({error: "error occured when storing a book"})
        }
   },


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   async getBook(req, res)
   {
       try
       {
        let copies = null
        console.log(req.params.id)
        

                async function getBook()
                       {  
                        
                  
                     const book = await Book.findByPk(req.params.id)  
                     console.log("here 1st: "+ book)          
                     return Promise.resolve(book);
                    }
                    getBook().then(
                     async (book) => 
                     {  
                        //console.log(book)
                        try
                        {
                                 copies = await  Copy.findAll({where: {bookID: book.id} })   
                                 res.send({"book": book, "copies": copies})                   
                        }
                        catch(err)
                        {
                            console.log(err)
                        }
                        
                
                      }
                    )



       
        
       }
       catch(err)
       {
        console.log("Getting lyrics book error"+ err)
        res.status(500).send({error: "error occured when getting lyrics"})
       }
   },



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


   async putBook(req, res)
   {
    try
       {
        console.log(req.params.id)
        const book = await Book.update(
            req.body,
            { where: { id: req.params.id} }
          )



        if(req.body.delete)
        {
            var del = req.body.delete.length
            const toDel = req.body.delete

            for(let i = 0; i < del; i++)
            {
                await Copy.destroy({ where: { id: toDel[i] } });
                console.log("delete :"+ toDel[i])
            }
        }

        if(req.body.add)
        {
            var add = req.body.add
            console.log("add :"+ add)
            for(let i = 0; i < add; i++)
            {
                console.log("add inside :"+ add)
                await Copy.create({bookID: req.params.id, userID: null, title: req.body.title })
            }
        }

        const copies = await Copy.findAll({ where: { bookID: req.params.id } });

        console.log("store a Book: "+ book)
        res.send(copies)
       }
       catch(err)
       {
        console.log("Getting lyrics book error"+ err)
        res.status(500).send({error: "error occured when getting lyrics"})
       }
   }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
