module.exports = (sequelize, DataTypes) =>
{
    const Burrow = sequelize.define('Burrow',    {
        copyID : DataTypes.STRING,
        bookID : DataTypes.STRING,
        userID : DataTypes.STRING,
        inDate : DataTypes.DATE,
        returned : { type: DataTypes.BOOLEAN, defaultValue: false }
    },{
        hooks: {

        }
    });
    return Burrow;
}