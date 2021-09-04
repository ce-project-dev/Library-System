const {Copy} = require('./')

function setTags (book, options)
{

return book.update({
        tags: book.id
      });
}


module.exports = (sequelize, DataTypes) =>
{
    const Book = sequelize.define('Book',    {
        title : DataTypes.STRING,
        author : DataTypes.STRING,
        edition : DataTypes.STRING,
        copies : DataTypes.STRING,
        tags: DataTypes.STRING,
        coverImageURL: DataTypes.STRING
    },{
        hooks: {
            afterCreate: setTags
        }
    });



    return Book;
}
