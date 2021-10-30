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
        console.log("TOKENNNNNNNNNNNNN: " + token)
        return Api().post('books', book, { headers: { 'jwt': token }});
    },
    searchBook(book)
    {
        return Api().get('bytags')
    },
    burrow (credentials, id,token) // user
    {   
        console.log("TOKENNNNNNNNNNNNN: " + token)
        let url = 'burrow/' + id
        return Api().post(url, credentials, { headers: { 'jwt': token }});
    },
    burrowedBooks (id,token) // user
    {   
        console.log("TOKENNNNNNNNNNNNN: " + token)
        let url = 'burrowed/'+id
        return Api().get(url, { headers: { 'jwt': token }});
    },
    returnCopy(copy,token) // admin
    {   
        console.log("TOKENNNNNNNNNNNNN: " + token)
        return Api().put(`burrow`, copy, { headers: { 'jwt': token }});
    }
    ,
    removeCopy(copy, book,token)// admin
    {   
        console.log("TOKENNNNNNNNNNNNN: " + token)
        return Api().delete(`burrow/${copy}`, {data: {book}}, { headers: { 'jwt': token }});
    },
    dropBook(copy,token)// // user
    {   
        console.log("TOKENNNNNNNNNNNNN: " + token)
        return Api().put(`drop`, copy, { headers: { 'jwt': token }});
    },
    lendCopy(copyID, token) //admin
    {
        console.log("TOKENNNNNNNNNNNNN1111111111111: " + token)
        
        return Api().put(`lend/${copyID}`,{}, { headers: { 'jwt': token }});
    },
    returnBook(copy,token) // admin
    {
        console.log("TOKENNNNNNNNNNNNN: " + token)
        
        return Api().put(`return`,copy, { headers: { 'jwt': token }});
    },
    burrowedCopies (book,token)// user
    {
        console.log("TOKENNNNNNNNNNNNN: " + token)
        return Api().get(`burrowedCopies/${JSON.stringify(book)}`, { headers: { 'jwt': token }});
    },
    addCopy(token) // admin
    {
       console.log("TOKENNNNNNNNNNNNN: " + token)
        return Api().get(`addCopy`, { headers: { 'jwt': token }});
    }
   
}

