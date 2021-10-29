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
    },
    burrow (credentials, id)
    {   
        let url = 'burrow/' + id
        return Api().post(url, credentials)
    },
    burrowedBooks (id)
    {   
        let url = 'burrowed/'+id
        return Api().get(url)
    },
    returnCopy(copy)
    {   
        console.log(copy)
        return Api().put(`burrow`, copy)
    }
    ,
    removeCopy(copy, book)
    {   
        console.log(book)
        return Api().delete(`burrow/${copy}`, {data: {book}})
    },
    dropBook(copy)
    {   
        console.log(copy)
        return Api().put(`drop`, copy)
    },
    lendCopy(copyID)
    {
        return Api().put(`lend/${copyID}`)
    },
    returnBook(copy)
    {
        return Api().put(`return`, copy)
    },
    burrowedCopies (book)
    {
        return Api().get(`burrowedCopies/${JSON.stringify(book)}`)
    }

}

