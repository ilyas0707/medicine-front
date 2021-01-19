import React, { useState } from 'react'
import { useGet } from '../../hooks/get.hook'
import { useMeetings } from '../../hooks/meetings.hook'
import { usePost } from '../../hooks/post.hook'
import { useDelete } from '../../hooks/delete.hook'
import Fuse from "fuse.js"
import Styles from './Payments.module.css'

export const Payments = () => {
    const meetingsGet = useGet('api/meeting/getAll')
    const paymentsGet = useGet('api/payments/getAll')
    const { paymentData } = useMeetings(meetingsGet.data.object)
    const { postHandler } = usePost('payments')
    const { deleteHandler } = useDelete('payments')

    const [form, setForm] = useState("")

    const titles = ['Врач', 'Пациент', 'Время', 'К оплате']

    const createPayment = (id, name, amount) => {
        const data = {
            description: `${ name } оплатил за прием`,
            amountPaid: amount
        }

        const pass = window.confirm("Вы уверенны?")
        if (pass) {
            postHandler(data, `api/payments/makeForMeeting/${ id }`)
        }
    }

    const editPayment = (id) => {
        // eslint-disable-next-line
        paymentsGet.data.object.map((payment) => {
            if (payment.parent.id === id) {
                deleteHandler('api/payments/delete', payment.id)
            }
        })
    }

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
    
    if (meetingsGet.loading) {
        return <div className="loading"></div>
    }

    if (paymentData.length === 0) {
        return <h2 className="empty">Пусто! Создайте запись для оплаты</h2>
    }

    return (
        <div className={Styles.payments}>
            <h2 className={Styles.heading}>Оплата</h2>
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
                    }).map(({ id, startDate, endDate, doctorName, patientName, amountToBePaid, statusPaid }, i) => {
                        let dateFrom = new Date(startDate)
                        let dateTo = new Date(endDate)
                        return (
                            <div className={`${Styles.item} ${statusPaid === 1 ? Styles.paid : ''}`} key={ i }>
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
                                <div className={`${Styles.pay} ${Styles.end}`}>
                                    <span>{ amountToBePaid } сом</span>
                                    {
                                        statusPaid === 1 ?
                                        <button className={Styles.button} onClick={(e) => {
                                            e.preventDefault()
                                            editPayment(id)
                                        }}>
                                            <i className={`material-icons ${Styles.icon}`}>cancel</i>
                                        </button> :
                                        <button className={Styles.button} onClick={(e) => {
                                            e.preventDefault()
                                            createPayment(id, patientName, amountToBePaid)
                                        }}>
                                            <i className={`material-icons ${Styles.icon}`}>check_circle</i>
                                        </button>
                                    }
                                </div>
                            </div>
                        )
                    }) : <h2 className="empty">Ничего не найдено!</h2>
                }
            </div>
        </div>
    )
}
