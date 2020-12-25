import React from 'react'
import { Form } from '../../components/Form/Form'
import Styles from './CreateUser.module.css'

export const CreateUser = () => {
    const createUser = [
        { type: 'text', name: 'username', label: 'Логин' },
        { type: 'text', name: 'password', label: 'Пароль' },
        { type: 'text', name: 'fullname', label: 'Имя' },
        { type: 'email', name: 'email', label: 'Email' },
        { type: 'number', name: 'phoneNumber', label: 'Номер телефона' },
        { type: 'date', name: 'birthDate', label: 'Дата рождения' },
        {
            select: [
                {
                    name: 'gender',
                    options: [
                        [
                            { label: 'Пол', id: 'undefined' },
                            { label: 'Мужской', id: 'MALE' },
                            { label: 'Женский', id: 'FEMALE' },
                        ],
                    ],
                },
            ],
            name: 'gender',
        },
        {
            select: [
                {
                    name: 'role',
                    options: [
                        [
                            { label: 'Роль', id: 'undefined' },
                            { label: 'Админ', id: 'ROLE_ADMIN' },
                            { label: 'Врач', id: 'ROLE_DOCTOR' },
                            { label: 'Кассир', id: 'ROLE_CASHIER' },
                            { label: 'Приемная', id: 'ROLE_RECEPTION' },
                        ],
                    ],
                },
            ],
            name: 'role',
        },
    ]

    function setUser(form, name, value) {
        return {
            user: {
                ...form.user,
                [name]:
                    name === 'birthDate'
                        ? new Date(value).toISOString()
                        : value,
            },
            role: form.role,
            [name === 'role' ? name : 'delete']: name === 'role' ? value : '',
        }
    }

    return (
        <div className={Styles.create}>
            <h2 className={Styles.heading}>Создать пользователя</h2>
            <Form
                component={'createUser'}
                data={[createUser]}
                url={'api/user/create'}
                set={setUser}
            />
        </div>
    )
}
