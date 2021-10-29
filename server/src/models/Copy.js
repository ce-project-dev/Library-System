
module.exports = (sequelize, DataTypes) =>
{
    const Copy = sequelize.define('Copy',    {
        bookID : DataTypes.STRING,
        copyID : DataTypes.STRING,
        userID : DataTypes.STRING,
        available : { type: DataTypes.BOOLEAN, defaultValue: true },
        lended : { type: DataTypes.BOOLEAN, defaultValue: false }
    },{
        hooks: {


        }
    });



    return Copy;
}
