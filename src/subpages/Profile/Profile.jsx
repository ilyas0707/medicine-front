import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/auth.hook'
import { useGet } from '../../hooks/get.hook'
import { useUsers } from '../../hooks/users.hook'
import Fuse from "fuse.js"

import Styles from './Profile.module.css'

import Man from './../../assets/icons/man.png'
import Woman from './../../assets/icons/woman.png'
import { useDelete } from '../../hooks/delete.hook'

export const Profile = () => {
    const { profile } = useAuth()
    const { data, loading } = useGet('api/user/getAll')
    const { usersData } = useUsers(data.object)
    const { deleteHandler } = useDelete('profile')
    const user = profile.object

    const [form, setForm] = useState("")
    const [opened, setOpened] = useState(0)

    const fields = [
        { label: user.fullname || 'Полное имя', icon: '' },
        { label: user.email || 'example@gmail.com', icon: 'email' },
        { label: `${user.phoneNumber || '+996700000000'}`, icon: 'phone' },
    ]

    const buttons = [
        { url: `/panel/profile/createUser`, icon: 'create', label: 'Создать пользователя' },
        { url: `/panel/profile/changePassword`, icon: 'vpn_key', label: 'Изменить пароль' },
    ]

    const fuse = new Fuse(usersData, {
        keys: [
            "fullname"
        ]
    })

    const results = fuse.search(form)
    const usersFiltered = form ? results.map(result => result.item) : usersData ? usersData : []

    const changeHandler = ({ currentTarget = {} }) => {
        const { value } = currentTarget
        setForm(value)
    }

    const openTab = (id) => {
        setOpened(id)
    }

    const links = [
        { name: 'Врачи' }, { name: 'Пациенты' }, { name: 'Другие' }
    ]

    const tabs = [
        { data: usersFiltered.filter(element => {
            return element.role === 'Врач'
        }) },
        { data: usersFiltered.filter(element => {
            return element.role === 'Пациент'
        }) },
        { data: usersFiltered.filter(element => {
            return element.role === 'Админ' || element.role === 'Кассир' || element.role === 'Приемная'
        }) },
    ]

    return (
        <div className={Styles.main}>
            <div className={Styles.profile}>
                <div className={Styles.card}>
                    <div className={Styles.avatar}>
                        {user.gender === 'MALE' ? 
                        <img src={Man} alt="man" /> :
                        <img src={Woman} alt="woman" />}
                    </div>
                    <div className={Styles.info}>
                        <ul>
                            {
                                fields.map(({ label, icon }, i) => {
                                    return (
                                        <li key={ i } className={Styles.item}>
                                            <i style={icon === '' ? {display: 'none'} : {}} className={`material-icons ${Styles.icon}`}>{ icon }</i>
                                            { label }
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className={Styles.buttons}>
                    {
                        buttons.map(({ url, icon, label }, i) => {
                            return (
                                <NavLink className={Styles.button} key={ i } to={ url }>
                                    <i className={`material-icons ${Styles.key}`}>{ icon }</i>
                                    <span className={Styles.text}>{ label }</span>
                                </NavLink>
                            )
                        })
                    }
                </div>
            </div>
            {
                loading ?
                <div className={Styles.left}><div className="loading"></div></div> :
                <div className={Styles.users}>
                    <h3 className={Styles.heading}>Пользователи</h3>
                    <div className={Styles.tabs}>
                        {
                            links.map(({name}, i) => {
                                return (
                                    <a
                                        key={ i }
                                        href="/"
                                        className={`${Styles.tab} ${opened === i ? Styles.selected : ''}`}
                                        onClick={e => {e.preventDefault(); openTab(i)}}>
                                        { name }
                                    </a>
                                )
                            })
                        }
                    </div>
                    <div className={Styles.search}>
                        <input type="text" className={Styles.input} name="fullname" onChange={changeHandler} placeholder="Поиск..." autoComplete="off" />
                    </div>
                    {
                        tabs.map((element, i) => {
                            return (
                                <div key={ i } className={`${Styles.block} ${opened === i ? Styles.active : ''}`}>
                                    {
                                        element.data.map(({ id, fullname, username, role }, i) => {
                                            return (
                                                <div key={ i } className={Styles.user}>
                                                    <div className={Styles.userInfo}>
                                                        <span><b>Полное имя:</b> { fullname }</span>
                                                        <span><b>Логин:</b> { username }</span>
                                                        <span><b>Роль:</b> { role }</span>
                                                    </div>
                                                    <button className={Styles.deleteButton} type="submit" onClick={() => {deleteHandler('api/user/delete', id)}}><i className={`material-icons ${Styles.delete}`}>delete</i></button>
                                                </div>
                                            )
                                        })
                                    }     
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}