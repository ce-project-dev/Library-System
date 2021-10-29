const {User} = require('../models')
const jwt = require('jsonwebtoken')

const config = require('../config/config')

function signUser(user)
{
  const expTime = 60*60*24*7

  return jwt.sign(user, config.authentication.jwtSecret)
}

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
            console.log(err)
            console.log("Error caught at register. Unique emails.")
            res.status(400).send({message: `This Email is in use!`})
        }


      },

      async login (req, res)
    {
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
                const response = user.toJSON()
                console.log("User login :"+ response.id + " " + response.email)
                const token = signUser(response.id);
                const expTime = 60*60*24*7
                res.cookie('jwt', token, { httpOnly: true, maxAge: expTime});
                res.send({user: response, token: token })
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


