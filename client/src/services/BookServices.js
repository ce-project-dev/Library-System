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
    createBook(book,token) // admin
    {
        return Api().post('books', book, { headers: { 'jwt': token }});
    },
    searchBook(book)
    {
        return Api().get('bytags')
    },
    burrow (credentials, id,token) // user
    {   
        let url = 'burrow/' + id
        return Api().post(url, credentials, { headers: { 'jwt': token }});
    },
    burrowedBooks (id,token) // user
    {   
        let url = 'burrowed/'+id
        return Api().get(url, { headers: { 'jwt': token }});
    },
    returnCopy(copy,token) // admin
    {   
        return Api().put(`burrow`, copy, { headers: { 'jwt': token }});
    }
    ,
    removeCopy(book,token)// admin
    {   
        return Api().delete(`burrow/${JSON.stringify(book)}`, { headers: { 'jwt': token }}, {data: {book}});
    },
    dropBook(copy,token)// // user
    {   
        return Api().put(`drop`, copy, { headers: { 'jwt': token }});
    },
    lendCopy(copyID, token) //admin
    {
        return Api().put(`lend/${copyID}`,{}, { headers: { 'jwt': token }});
    },
    returnBook(copy,token) // admin
    {
        return Api().put(`return`,copy, { headers: { 'jwt': token }});
    },
    burrowedCopies (book,token)// user
    {
        return Api().get(`burrowedCopies/${JSON.stringify(book)}`, { headers: { 'jwt': token }});
    },
    addCopy(token) // admin
    {
       return Api().get(`addCopy`, { headers: { 'jwt': token }});
    },
    getLenders(token){
        return Api().get(`lenders`,{headers : {'jwt': token}});
    }
   
}

