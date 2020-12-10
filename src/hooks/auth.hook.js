import { useState, useCallback, useEffect } from "react"

const storageName = "userStatus"
const profileStorage = 'profileStorage'

export const useAuth = () => {
    const [status, setStatus] = useState(null)
    const [profile, setProfile] = useState({
        object: ''
    })
    const [code, setCode] = useState('')

    const login = useCallback((status, profile) => {
        const hashed = JSON.parse(localStorage.getItem('userCode'))
        setCode(hashed)
        setProfile(profile)
        setStatus(status)

        localStorage.setItem(profileStorage, JSON.stringify({ data: profile }))
        localStorage.setItem(storageName, JSON.stringify({ status: status }))
    }, [])

    const logout = useCallback(() => {
        setProfile({})
        setStatus(null)

        localStorage.removeItem(storageName)
        localStorage.removeItem(profileStorage)
        localStorage.removeItem('userCode')
    }, [])

    useEffect(() => {
        const info = JSON.parse(localStorage.getItem(profileStorage))
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data) {
            login(data.status, info.data)
        }
    }, [login])

    return { login, logout, status, profile, code }
}