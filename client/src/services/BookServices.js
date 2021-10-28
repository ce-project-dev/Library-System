import Api from '@/services/Api'

export default
{
    getBooks(search)
    {
        return Api().get('books', {params:{search: search}})
    },
    getBook(id)
    {
        return Api().get(`books/${id}`)
    },
    createBook(book)
    {
        return Api().post('books', book)
    },
    searchBook(book)
    {
        return Api().get('bytags')
    }
}

