import React, { useState } from 'react'
import { useGet } from '../../hooks/get.hook'
import { useMeetings } from '../../hooks/meetings.hook'
import Fuse from "fuse.js"
import Styles from './Meetings.module.css'

export const Meetings = ({ patientId }) => {
    const { data, loading } = useGet(`api/meeting/getByPatient/${patientId}`)
    const { paymentData } = useMeetings(data.object)

    const [form, setForm] = useState("")

    const titles = ['Врач', 'Пациент', 'Время']

    const fuse = new Fuse(paymentData, {
        keys: [
            'patientName'
        ]
    })

    const results = fuse.search(form, { limit: 3 })
    const paymentDataFiltered = form ? results.map(result => result.item) : paymentData

    const changeHandler = ({ currentTarget = {} }) => {
        const { value } = currentTarget
        setForm(value)
    }

    if (loading) {
        return <div className="loading"></div>
    }

    if (paymentData.length === 0) {
        return (
            <h2 className="empty">
                <i className={`material-icons search`}>cancel_presentation</i>
                Пусто! Создайте запись для оплаты
            </h2>
        )
    }

    return (
        <div className={Styles.meetings}>
            <h2 className={Styles.heading}>Визиты</h2>
            <div className={Styles.search}>
                <input type="text" className={Styles.input} name="fullname" onChange={changeHandler} placeholder="Поиск..." autoComplete="off" />
            </div>
            <div className={Styles.block}>
                <div className={Styles.title}>
                    {
                        titles.map((title, i) => {
                            return (
                                <span key={ i } className={title === 'К оплате' ? Styles.end : ''}>
                                    { title }
                                </span>
                            )
                        })
                    }
                </div>
                {
                    paymentDataFiltered.length !== 0 ?
                    paymentDataFiltered.sort((a, b) => {
                        return (a.doctorId > b.doctorId) ? 1 : -1
                    }).sort(function(a, b){
                        return new Date(b.startDate) - new Date(a.startDate)
                    }).sort((a, b) => {
                        return (a.statusPaid > b.statusPaid) ? 1 : -1
                    }).map(({ startDate, endDate, doctorName, patientName }, i) => {
                        let dateFrom = new Date(startDate)
                        let dateTo = new Date(endDate)
                        return (
                            <div className={Styles.item} key={ i }>
                                <span>{ doctorName }</span>
                                <span>{ patientName }</span>
                                <div className={Styles.date}>
                                    <div className={Styles.highlighted}>
                                        <span>{ `${ dateFrom.getDate() }/${ dateFrom.getMonth() + 1 }/${ dateFrom.getFullYear() }` }, </span>
                                        <span>
                                            { `${ dateFrom.getHours() }:${ (dateFrom.getMinutes()<10?'0':'') + dateFrom.getMinutes() }` } -
                                            { ` ${ dateTo.getHours() }:${ (dateTo.getMinutes()<10?'0':'') + dateTo.getMinutes() }` }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <h2 className="empty">Ничего не найдено!</h2>
                }
            </div>
        </div>
    )
}
