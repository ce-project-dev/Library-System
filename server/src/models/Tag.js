module.exports = (sequelize, DataTypes) =>
{
    const Tag = sequelize.define('Tag',    {
        bookID : DataTypes.STRING,
        tag : DataTypes.STRING
    },{
        hooks: {

        }
    });
    return Tag;
}