
module.exports = (sequelize, DataTypes) =>
{
    const Copy = sequelize.define('Copy',    {
        bookID : DataTypes.STRING,
        userID : DataTypes.STRING,
        title : DataTypes.STRING,
        available : { type: DataTypes.BOOLEAN, defaultValue: true }
    },{
        hooks: {


        }
    });



    return Copy;
}
