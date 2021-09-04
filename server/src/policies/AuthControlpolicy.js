const Joi = require('joi')

module.exports = {
    register(req, res, next)
    {
         const schema = Joi.object({
             email: Joi.string().email(),
             password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{6,32}$'))
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
                    res.status(400).send({error: 'Invalid reg info!'})
                }
         }
         else
         {
            next()
         }

    }
}