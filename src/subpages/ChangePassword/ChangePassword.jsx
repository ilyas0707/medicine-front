import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../hooks/auth.hook'
import { useHttp } from '../../hooks/http.hook'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useSuccess } from '../../hooks/success.hook'
import { useError } from '../../hooks/error.hook'
import Styles from './ChangePassword.module.css'
import { AuthContext } from '../../context/AuthContext'

export const ChangePassword = () => {
    toast.configure({
        position: "top-center",
        autoClose: 2000,
        draggable: true
    })

    const { code } = useAuth()
    const auth = useContext(AuthContext)
    const { request, API_URL } = useHttp()
    const history = useHistory()
    const successMessage = useSuccess()
    const errorMessage = useError()
    const [password, setPassword] = useState({
        password: ''
    })
    const [form, setForm] = useState({
        newPassword: ''
    })

    const changePassword = async () => {
        if (password.password !== '' && form.newPassword !== '') {
            if (password.password === form.newPassword) {
                try {
                    const data = await request(`${API_URL}/api/login/changePassword`, "POST", {...form}, {
                        Authorization: `Basic ${code.hashed}`
                    })
                    successMessage(data.message)
                    auth.logout()
                    history.push("/")
                } catch (e) {
                    errorMessage("Ошибка!")
                }
            } else {
                errorMessage("Пароли не совпадают!")
            }
        } else {
            errorMessage("Поля не должны быть пустыми!")
        }
    }

    const passwordHandler = e => {     
        setPassword({ 
            ...form, [e.target.name]: e.target.value
        })
    }

    const checkPasswordHandler = e => {     
        setForm({ 
            ...form, [e.target.name]: e.target.value
        })
    }
    
    return (
        <div className={Styles.form}>
            <form className={Styles.block}>
                <h3 className={Styles.heading}>Изменить пароль</h3>
                <div className={Styles.item}>
                    <input 
                        type="password"
                        className={Styles.input}
                        name="password"
                        placeholder="Новый пароль"
                        autoComplete="off"
                        onChange={passwordHandler} />
                </div>
                <div className={Styles.item}>
                    <input 
                        type="password"
                        className={Styles.input}
                        name="newPassword"
                        placeholder="Подтвердить пароль"
                        autoComplete="off"
                        onChange={checkPasswordHandler} />
                </div>
                <button type="submit" onClick={() => {changePassword()}} className={Styles.submit}>Изменить</button>
            </form>
        </div>
    )
}