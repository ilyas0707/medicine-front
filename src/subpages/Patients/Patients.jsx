import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Fuse from "fuse.js"

import Styles from './Patients.module.css'

export const Patients = () => {
    const [form, setForm] = useState("")

    const patients = [
        { fullname: 'Shabdan Abjaparov', birthdate: '01/02/2000' , phoneNumber: '555454545' , cardNumber: '642' },
        { fullname: 'Atay Dalbaev', birthdate: '02/03/2001' , phoneNumber: '333232323' , cardNumber: '643' },
        { fullname: 'Ilyas Yangurazov', birthdate: '03/04/2002' , phoneNumber: '888676767' , cardNumber: '644' },
        { fullname: 'Muzafar Yusup', birthdate: '04/05/2003' , phoneNumber: '222464646' , cardNumber: '645' },
        { fullname: 'Daniyar Chekirov', birthdate: '05/06/2004' , phoneNumber: '999111111' , cardNumber: '646' }
    ]

    const fuse = new Fuse(patients, {
        keys: [
            "fullname"
        ]
    })

    const results = fuse.search(form)
    const patientsFiltered = form ? results.map(result => result.item) : patients

    const changeHandler = ({ currentTarget = {} }) => {
        const { value } = currentTarget
        setForm(value)
    }

    return (
        <div className={Styles.patients}>
            <h2 className={Styles.heading}>Пациенты</h2>
            <div className={Styles.search}>
                <input type="text" className={Styles.input} name="fullname" onChange={changeHandler} placeholder="Поиск..." autoComplete="off" />
            </div>
            <div className={Styles.block}>
                {
                    patientsFiltered.map(({ fullname, birthdate, phoneNumber, cardNumber }, i) => {
                        return (
                            <NavLink key={ i } to={`/panel/patients/${cardNumber}`} className={Styles.patient}>
                                <div className={Styles.link}>
                                    <span><b>Полное имя:</b> { fullname }</span>
                                    <span><b>Дата рождения:</b> { birthdate }</span>
                                    <span><b>Номер телефона:</b> { phoneNumber }</span>
                                </div>
                                <span className={Styles.flag}>{ cardNumber }</span>
                            </NavLink>
                        )
                    })
                }
            </div>
        </div>
    )
}
