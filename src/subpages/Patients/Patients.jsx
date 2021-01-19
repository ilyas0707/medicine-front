import React, { useState } from 'react'
import { useGet } from '../../hooks/get.hook'
import { useCards } from '../../hooks/cards.hook'
import { NavLink } from 'react-router-dom'
import Fuse from "fuse.js"

import Styles from './Patients.module.css'

export const Patients = () => {
    const [form, setForm] = useState("")

    const { data, loading } = useGet('api/patientController/getAll')
    const { patientCards } = useCards(data.object)

    const fuse = new Fuse(patientCards, {
        keys: [
            'personalInfo.fullname.data'
        ]
    })

    const results = fuse.search(form, { limit: 3 })
    const patientCardsFiltered = form ? results.map(result => result.item) : patientCards

    const changeHandler = ({ currentTarget = {} }) => {
        const { value } = currentTarget
        setForm(value)
    }

    if (loading) {
        return <div className="loading"></div>
    }

    return (
        <div className={Styles.patients}>
            <h2 className={Styles.heading}>
                Пациенты
                <NavLink className={Styles.button} to="/panel/patients/create">
                    <i className={`material-icons ${Styles.icon}`}>add_circle_outline</i>
                </NavLink>
            </h2>
            <div className={Styles.search}>
                <input type="text" className={Styles.input} name="fullname" onChange={changeHandler} placeholder="Поиск..." autoComplete="off" />
            </div>
            <div className={Styles.block}>
                {
                    patientCardsFiltered.length !== 0 ?
                    patientCardsFiltered.map(({ id, personalInfo }, i) => {
                        return (
                            personalInfo.map(({ fullname, birthDate, phoneNumber }) => {
                                return (
                                    <NavLink key={ i } to={`/panel/patients/${id}`} className={Styles.patient}>
                                        <div className={Styles.link}>
                                            <span><b>Полное имя:</b> { fullname.data }</span>
                                            <span><b>Дата рождения:</b> { birthDate.data }</span>
                                            <span><b>Номер телефона:</b> { phoneNumber.data }</span>
                                        </div>
                                        <span className={Styles.flag}>{ id }</span>
                                    </NavLink>
                                )
                            })
                        )
                    }) : <h2 className="empty">Ничего не найдено!</h2>
                }
            </div>
        </div>
    )
}
