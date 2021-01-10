import { useCallback } from "react"
import { useAuth } from "./auth.hook"
import { useHttp } from "./http.hook"
import { useSuccess } from './success.hook'
import { useError } from "./error.hook"
import { useHistory } from "react-router-dom"

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

export const useDelete = (component) => {
    toast.configure({
        position: 'top-center',
        autoClose: 3000,
        draggable: true
    })
    
    const { code } = useAuth()
    const { request, API_URL } = useHttp()
    const successMessage = useSuccess()
    const errorMessage = useError()
    const history = useHistory()

    const deleteHandler = useCallback(async (url, id) => {
        const pass = window.confirm("Вы уверенны?")
        if (pass) {
            try {
                const deleted = await request(`${API_URL}${url}/${id}`, "DELETE", null, {
                    Authorization: `Basic ${code.hashed}`
                })
                successMessage(deleted.messageRU)
                history.push('/')
                history.push(`panel/${component}`)
            } catch (e) {
                errorMessage(e.messageRU)
            }
        }

    }, [code, request, API_URL, component, history, successMessage, errorMessage])

    return { deleteHandler }
}