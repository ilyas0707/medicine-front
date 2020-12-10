import { useEffect, useState } from "react"
import { useAuth } from "./auth.hook"
import { useHttp } from "./http.hook"

export const useGet = (url) => {
    const { code, profile } = useAuth()
    const admin = profile.userRole
    const { loading, request, API_URL } = useHttp()
    const [data, setData] = useState([])

    useEffect(() => {
        let mounted = true
        try {
            if (mounted && code) {
                request(`${API_URL}${url}`, "GET", null, {
                    Authorization: `Basic ${code.hashed}`
                }).then(result => {
                    setData(result)
                })
            }
        } catch (e) {}
        return () => mounted = false
    }, [request, API_URL, code, url])

    return { data, loading, admin }
}