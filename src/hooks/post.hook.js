import { useCallback } from "react"
import { useHistory } from "react-router-dom"
import { useHttp } from "./http.hook"
import { useAuth } from "./auth.hook"
import { useSuccess } from "./success.hook"
import { useError } from "./error.hook"

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

export const usePost = (component) => {
    toast.configure({
        position: 'top-center',
        autoClose: 3000,
        draggable: true
    })

    const { code } = useAuth()
    const successMessage = useSuccess()
    const errorMessage = useError()
    const { loading, request, API_URL } = useHttp()
    const history = useHistory()

    const postHandler = useCallback(async (data, url) => {
        try {
            const posted = await request(`${API_URL}${url}`, "POST", {...data}, {
                Authorization: `Basic ${code.hashed}`
            })
            successMessage(posted.messageRU)
    
            history.push('/')
            history.push(`panel/${component}`)
        } catch (e) {
            errorMessage(e.messageRU)
        }
    }, [code, request, API_URL, component, history, successMessage, errorMessage])

    return { postHandler, loading }
}