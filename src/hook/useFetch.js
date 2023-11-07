import { useState } from "react"
import axios from "axios"  


const useFetch = (url) => {

    const [infoApi, setinfoApi] = useState()
    const [isLoading, setisLoading] = useState(true)
    const [hasError, sethasError] = useState(false)


    const getApi = () => {
        setisLoading(true)
        axios.get(url)
        .then(res=>{
            setinfoApi(res.data)
            sethasError(false)
        })
        .catch(err=>{
            console.log(err)
            sethasError(true)
        })
        .finally(()=>setisLoading(false))

    }

    return [infoApi,getApi,hasError,isLoading]


}

export default useFetch 