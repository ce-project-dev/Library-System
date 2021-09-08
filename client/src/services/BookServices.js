import Api from '@/services/Api'

export default
{
    getBooks()
    {
        return Api().get('books')
    },
    getBook(id)
    {
        return Api().get(`books/${id}`)
    },
    createBook(book)
    {
        return Api().post('books', book)
    }
}

