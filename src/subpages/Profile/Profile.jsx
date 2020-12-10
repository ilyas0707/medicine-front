import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/auth.hook'
import { useGet } from '../../hooks/get.hook'
import { useUsers } from '../../hooks/users.hook'

import Styles from './Profile.module.css'

import Man from './../../assets/icons/man.png'
import Woman from './../../assets/icons/woman.png'

export const Profile = () => {
    const { profile } = useAuth()
    const { data, loading } = useGet('/user/getAll')
    const { usersData } = useUsers(data.object)
    const user = profile.object

    console.log(usersData);

    if (loading) {
        return (
            <div className={Styles.loading}></div>
        )
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
            <div className={Styles.wrapper}>
                    <table cellPadding="10" border="0" bordercolor="#304269" className={Styles.table}>
                        <caption>Пользователи</caption>
                        <thead>
                            <tr><th>Имя</th><th>Логин</th><th>Роль</th><th></th></tr>
                        </thead>
                        <tbody>
                            {
                                usersData ?
                                usersData.map(({ id, fullname, username, role }, i) => {
                                    return username === 'god' ? null :
                                    <tr key={ i }>
                                        <td>{ fullname }</td>
                                        <td>{ username }</td>
                                        <td>{ role }</td>
                                        <td width="1%">
                                            <button className={Styles.deleteButton} type="submit" onClick={() => {console.log('delete')}}><i className={`material-icons ${Styles.delete}`}>delete</i></button>
                                        </td>
                                    </tr>
                                }) : null
                            }
                        </tbody>
                    </table>
                </div>
        </>
    )
}