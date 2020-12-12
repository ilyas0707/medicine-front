import React, { useState, useEffect, useCallback, useContext } from "react"
import Styles from "./Auth.module.css"

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useHttp } from "./../../hooks/http.hook"
import { useError } from "./../../hooks/error.hook"
import { AuthContext } from './../../context/AuthContext'

export const Auth = () => {
    toast.configure({
        position: "top-center",
        autoClose: 3000,
        draggable: true
    })

    const auth = useContext(AuthContext)
    const errorMessage = useError()
    const { loading, request, API_URL } = useHttp()
    const [form, setForm] = useState({})

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = useCallback(async () => {
        const cyrillicPattern = /^[\u0400-\u04FF]+$/
        let mounted = true

        try {
            if (form.username === '' || form.password === '') {
                errorMessage('Поля не должны быть пустыми!')
            } else if (cyrillicPattern.test(form.username) === true || cyrillicPattern.test(form.password)) {
                errorMessage('Нельзя вводить русские символы!')
            } else {
                if (mounted) {
                    let hashed = btoa(form.username + ':' + form.password)
                    localStorage.setItem('userCode', JSON.stringify({ hashed: hashed }))
                    
                    const fetched = await request(`${API_URL}/api/myUser`, "GET", null, {
                        Authorization: `Basic ${hashed}`
                    })

                    auth.login(fetched.successful, fetched, hashed)
                }
            }
        } catch (e) {
            errorMessage('Введены некорректные данные!')
        }
        return () => mounted = false

    }, [auth, form, errorMessage, request, API_URL])
    
    const enterHandler = useCallback((event) => {
        if(event.keyCode === 13) {
            loginHandler()
        }
    }, [loginHandler])

    useEffect(() => {
        document.addEventListener("keydown", enterHandler, false)
        return () => {
            document.removeEventListener("keydown", enterHandler, false)
        }
    }, [enterHandler])

    return(
        <div className={Styles.container}>
            <div className={Styles.block}>
                <h2 className={Styles.heading}>Вход</h2>
                <form action="#" className={Styles.form}>
                    <div className={Styles.inputBlock}>
                        <input 
                            type="text"
                            className={Styles.input}
                            name="username"
                            placeholder="Логин"
                            autoComplete="off"
                            onChange={changeHandler} />
                        <label htmlFor="username" className={Styles.label}>Логин</label>
                    </div>
                    <div className={Styles.inputBlock}>
                        <input 
                            type="password"
                            className={Styles.input}
                            name="password"
                            placeholder="Пароль"
                            autoComplete="off"
                            onChange={changeHandler} />
                        <label htmlFor="password" className={Styles.label}>Пароль</label>
                    </div>
                    <div className={loading ? 'loading' : Styles.buttons}>
                        <a 
                            href="/" 
                            className={loading ? 
                                Styles.dn : Styles.submit}
                            onClick={e => {e.preventDefault(); loginHandler()}}>Войти</a>
                    </div>
                </form>
            </div>
        </div>
    )
}