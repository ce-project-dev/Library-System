const Joi = require('joi')

module.exports = {
    register(req, res, next)
    {
         const schema = Joi.object({
            fname: Joi.string(),
            lname: Joi.string(),
            email: Joi.string().email(),
            enroll: Joi.string(), 

             password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{6,32}$')),
             role: Joi.string()
         })
         const {error, value} = schema.validate(req.body)

         if(error)
         {
            var issue = JSON.stringify(error.details[0].message)

                 if(JSON.stringify(issue).includes("email") )
                 {
                    res.status(400).send({error: 'Use a valid email!'})
                 }

                else if(JSON.stringify(issue).includes("password") )
                {
                    res.status(400).send({error: 'Use a valid password!'})
                }
                else
                {   
                    console.log(JSON.stringify(issue))
                    res.status(400).send({error: 'Invalid reg info!'})
                }
         }
         else
         {
            next()
         }

    }
}