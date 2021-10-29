const {User, Burrow, Book} = require('../models')
const jwt = require('jsonwebtoken')
const { Op } = require("sequelize");
const config = require('../config/config')


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function signUser(user)
{
  const expTime = 60*60*24*7

  return jwt.sign(user, config.authentication.jwtSecret)
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
   async register (req, res)
     {
      console.log("register a user")
        try
        {   

            console.log(req.body)
            const user = await User.create(req.body)
            console.log("User Created :"+ user)
            res.send(user.toJSON())
        }
        catch (err)
        {
            console.log("Error caught at register. Unique emails.")
            res.status(400).send({message: `This Email is in use!`})
        }


      },
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      async login (req, res)
    { 
      let ids = []
      let dueDates = []
       try
       {
           const {email, password} = req.body
           const user = await User.findOne(
             {
               where: {
                 email: email
               }
             }
           )

           if(!user)
           {
             res.status(403).send({error: "Incorrect Email Address!" })
           }
           else
           {
              console.log("login 1 :"+user.password)
              const isPasswordValid = await user.comparePassword(password)
              console.log(isPasswordValid)
              if(!isPasswordValid)
              {
                res.status(403).send({error: "Incorrect Password!" })
              }
              else
              {


//////////////////////////////////////////////////////////////////////////////


                async function getBurrows() 
                       {  
                       
                  
                       burrows = await Burrow.findAll({where: {userID: user.id,returned: false} })

                           
                       
                        burrows.forEach(function(burrow)
                                      {    
                                          //console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
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

                          //console.log(ids)
                          const response = user.toJSON()
                          console.log("User login :"+ response.id + " " + response.email)
                          const token = signUser(response.id);
                          const expTime = 60*60*24*7
                          res.cookie('jwt', token, { httpOnly: true, maxAge: expTime});
                          res.send({user: response, token: token, results: results, due: dueDates })

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








//////////////////////////////////////////////////////////

                /*
                const response = user.toJSON()
                console.log("User login :"+ response.id + " " + response.email)
                const token = signUser(response.id);
                const expTime = 60*60*24*7
                res.cookie('jwt', token, { httpOnly: true, maxAge: expTime});
                res.send({user: response, token: token })
                */





              }
           }
       }
       catch (err)
       {
           console.log("Error caught at login "+ err)
           res.status(500).send({error: "Server error while login!" })
       }


     }


}


