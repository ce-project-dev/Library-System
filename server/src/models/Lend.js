module.exports = (sequelize, DataTypes) =>
{
    const Lend = sequelize.define('Lend',    {
        copyID : DataTypes.STRING,
        bookID : DataTypes.STRING,
        userID : DataTypes.STRING,
        inDate : DataTypes.DATE,
        returned : { type: DataTypes.BOOLEAN, defaultValue: false }
    },{
        hooks: {

        }
    });
    return Lend;
}