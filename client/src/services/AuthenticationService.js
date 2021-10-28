import Api from '@/services/Api'

export default
{
    register (credentials)
    {
        return Api().post('register', credentials)
    },
    login (credentials)
    {   
        return Api().post('login', credentials)
    },
    burrow (credentials, id)
    {   
        let url = 'burrow/' + id
        //url.append(id)
        console.log("url :" + url)
        return Api().post(url, credentials)
    }
}


    