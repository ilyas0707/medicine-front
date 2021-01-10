import React from 'react'
import { useGet } from '../../hooks/get.hook'
import { useMeetings } from '../../hooks/meetings.hook'
import { usePost } from '../../hooks/post.hook'
import { useDelete } from '../../hooks/delete.hook'
import Styles from './Payments.module.css'

export const Payments = () => {
    const meetingsGet = useGet('api/meeting/getAll')
    const paymentsGet = useGet('api/payments/getAll')
    const { paymentData } = useMeetings(meetingsGet.data.object)
    const { postHandler } = usePost('payments')
    const { deleteHandler } = useDelete('payments')

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
    
    if (meetingsGet.loading) {
        return <div className="loading"></div>
    }

    return (
        <div className={Styles.payment}>
            <h2 className={Styles.heading}>Оплата</h2>
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
                    paymentData.sort((a, b) => {
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
                    })
                }
            </div>
        </div>
    )
}
