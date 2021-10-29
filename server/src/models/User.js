const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options)
{
    const SALT_FACTOR = 8
    if(!user.changed('password'))
    {
        return;
    }
    else
    {
        return bcrypt.
                genSaltAsync(SALT_FACTOR)
                .then(salt => bcrypt.hashAsync(user.password, salt, null))
                .then(hash => {
                    user.setDataValue('password', hash)
                })
    }


}



module.exports = (sequelize, DataTypes) =>
{
    const User = sequelize.define('User',    {
        email : {
            type: DataTypes.STRING,
           unique: {
                args: true,
                msg: 'Oops. Looks like you already have an account with this email address. Please try to login.'
                 }
        },
        password : {
            type: DataTypes.STRING
        },
        name : {
            type: DataTypes.STRING,
            // default: 'John Smith'
        },
        role : {type: DataTypes.STRING, defaultValue:"user" },

        dueDate : {
            // default: '2 weeks',
            type: DataTypes.STRING
        }
    },{
        hooks: {
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword
        }
    });

    User.prototype.comparePassword = function (password)
    {
            console.log("in login 2: "+this.password)
            return bcrypt.compareAsync(password, this.password)
    }

    return User;
}
