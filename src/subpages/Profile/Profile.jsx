import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/auth.hook'
import { useGet } from '../../hooks/get.hook'
import { useUsers } from '../../hooks/users.hook'
import Fuse from "fuse.js"

import Styles from './Profile.module.css'

import Man from './../../assets/icons/man.png'
import Woman from './../../assets/icons/woman.png'

export const Profile = () => {
    const { profile } = useAuth()
    const { data, loading } = useGet('/user/getAll')
    const { usersData } = useUsers(data.object)
    const user = profile.object

    const [form, setForm] = useState("")

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

    return (
        <>
            <div className={Styles.profile}>
                <div className={Styles.card}>
                    <div className={Styles.avatar}>
                        {user.gender === 'MALE' ? 
                        <img src={Man} alt="man" /> :
                        <img src={Woman} alt="woman" />}
                    </div>
                    <div className={Styles.info}>
                        <ul>
                            <li className={Styles.item}>
                                {user.fullname || 'Полное имя'}
                            </li>
                            <li className={Styles.item}>
                                <i className={`material-icons ${Styles.icon}`}>email</i>
                                {user.email || 'example@gmail.com'}
                            </li>
                            <li className={Styles.item}>
                                <i className={`material-icons ${Styles.icon}`}>phone</i>
                                {`${user.phoneNumber || '+996700000000'}`}
                            </li>
                            <li className={Styles.item}>
                                {`Возраст: ${user.age || 'Возраст'}`}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={Styles.buttons}>
                    <NavLink activeClassName={Styles.active} to={`/panel/profile/createUser`}>
                        <i className={`material-icons ${Styles.key}`}>create</i>
                        <span className={Styles.text}>Создать</span>
                    </NavLink>
                    <NavLink activeClassName={Styles.active} to={`/panel/profile/changePassword`}>
                        <i className={`material-icons ${Styles.key}`}>vpn_key</i>
                        <span className={Styles.text}>Изменить пароль</span>
                    </NavLink>
                </div>
            </div>
            {
                loading ?
                <div className="loading"></div> :
                <div className={Styles.users}>
                    <h3 className={Styles.heading}>Пользователи</h3>
                    <div className={Styles.search}>
                        <input type="text" className={Styles.input} name="fullname" onChange={changeHandler} placeholder="Поиск..." autoComplete="off" />
                    </div>
                    <div className={Styles.block}>
                        {
                            usersFiltered.map(({ id, fullname, username, role }, i) => {
                                return username === 'god' ? null :
                                <div className={Styles.user} key={ i }>
                                    <div className={Styles.userInfo}>
                                        <span><b>Полное имя:</b> { fullname }</span>
                                        <span><b>Логин:</b> { username }</span>
                                        <span><b>Роль:</b> { role }</span>
                                    </div>
                                    <button className={Styles.deleteButton} type="submit" onClick={() => {console.log(`delete ${ id }`)}}><i className={`material-icons ${Styles.delete}`}>delete</i></button>
                                </div>
                            })
                        }
                    </div>
                </div>
            }
        </>
    )
}