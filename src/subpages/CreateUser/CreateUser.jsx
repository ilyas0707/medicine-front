import React from 'react'
import { Form } from '../../components/Form/Form'
import Styles from './CreateUser.module.css'

export const CreateUser = () => {

    const createUser = [
        { type: "text", name: "username", label: "Логин"},
        { type: "text", name: "password", label: "Пароль"},
        { type: "text", name: "fullname", label: "Имя"},
        { type: "email", name: "email", label: "Email"},
        { type: "number", name: "phoneNumber", label: "Номер телефона"},
        { type: "number", name: "age", label: "Возраст"},
    ]

    const select = [
        { name: "gender", options: [[
            { label: 'Пол', id: 'undefined' }, 
            { label: 'Мужской', id: 'MALE' }, 
            { label: 'Женский', id: 'FEMALE' } 
        ]] },
    ]

    return (
        <div className={Styles.create}>
            <h2 className={Styles.heading}>Создать пользователя</h2>
            <Form component={ 'createUser' } data={ createUser } url={ 'admin/users/create' } select={ select } />
        </div>
    )
}