import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/auth.hook'
import { useGet } from '../../hooks/get.hook'
import { useUsers } from '../../hooks/users.hook'
import Fuse from "fuse.js"
import Styles from './Telemedicine.module.css'

export const Telemedicine = () => {
    const { profile } = useAuth()
    const currentUser = profile.object
    const { data, loading } = useGet('api/user/getAll')
    const { usersData } = useUsers(data.object)

    console.log(usersData);

    const [form, setForm] = useState("")

    const fuse = new Fuse(usersData, {
        keys: [
            'fullname'
        ]
    })

    const results = fuse.search(form, { limit: 3 })
    const usersDataFiltered = form ? results.map(result => result.item) : usersData

    const changeHandler = ({ currentTarget = {} }) => {
        const { value } = currentTarget
        setForm(value)
    }

    if (loading) {
        return <div className="loading"></div>
    }

    return (
        <div className={Styles.telemedicine}>
            <h2 className={Styles.heading}>Связаться</h2>
            <div className={Styles.search}>
                <input type="text" className={Styles.input} name="fullname" onChange={changeHandler} placeholder="Поиск..." autoComplete="off" />
            </div>
            <div className={Styles.block}>
                {
                    usersDataFiltered.length !== 0 ?
                    usersDataFiltered.filter((el) => {
                        return el.fullname !== currentUser.fullname ? el : null
                    }).map(({ id, fullname }) => {
                        return (
                            <div className={Styles.item} key={ id }>
                                { fullname }
                                <div className={Styles.buttons}>
                                    <NavLink to={`/panel/telemedicine/video/${id}`} className={Styles.button}>
                                        <i className={`material-icons ${Styles.video}`}>videocam</i>
                                    </NavLink>
                                    <NavLink to={`/panel/telemedicine/chat/${id}`} className={Styles.button}>
                                        <i className={`material-icons ${Styles.chat}`}>chat_bubble</i>
                                    </NavLink>
                                </div>
                            </div>
                        )
                    }) : <h2 className="empty">
                             <i className={`material-icons search`}>search_off</i>
                             Ничего не найдено!
                         </h2>
                }
            </div>
        </div>
    )
}
