import React, { useState } from 'react'
import { useGet } from '../../hooks/get.hook'
import { useReport } from '../../hooks/report.hook'
import { useDelete } from '../../hooks/delete.hook'
import { Modal } from '../Modal/Modal'
import Styles from './Report.module.css'

export const Report = ({ patientId, cardId }) => {
    const { data, loading } = useGet(`api/diagnose/getByPatient/${patientId}`)
    const { reportData } = useReport(data.object)
    const { deleteHandler } = useDelete(`patients/${cardId}`)

    const [open, setOpen] = useState(false)

    const openModal = () => {
        setOpen(!open)
    }

    const createReport = [
        { type: 'text', name: 'title', label: 'Наименование' },
    ]

    const buttons = [
        { icon: 'border_color', func: openModal },
        { icon: 'print', func: () => console.log('print') },
    ]

    if (loading) {
        return <div className="loading"></div>
    }

    return (
        <div className={Styles.report}>
            <h3 className={Styles.heading}>
                Диагнозы
                <div className={Styles.buttons}>
                    {
                        buttons.map(({ icon, func }, i) => {
                            return (
                                <button key={ i } className={Styles.button} onClick={() =>
                                    func()
                                }>
                                    <i className={`material-icons ${Styles.icon}`}>{ icon }</i>
                                </button>
                            )
                        })
                    }
                </div>
            </h3>
            {
                reportData.length === 0 ?
                <h2 className="empty">
                    <i className={`material-icons search`}>cancel_presentation</i>
                    Пусто! Создайте запись для оплаты
                </h2> :
                <div className={Styles.block}>
                    {
                        reportData.map(({ id, title }, i) => {
                            return (
                                <div key={ i } className={Styles.item}>
                                    <div className={Styles.title}>
                                        <b>{ title }</b>
                                        <button className={Styles.delete} onClick={() =>
                                            deleteHandler('api/diagnose/deleteById', id)
                                        }>
                                            <i className={`material-icons ${Styles.trash}`}>delete</i>
                                        </button>
                                    </div>
                                    <p>Направления: ---</p>
                                    <p>Рецепты: ---</p>
                                </div>
                            )
                        })
                    }
                </div>
            }
            {open ? <Modal id={cardId} component={'report'} url={`api/diagnose/createForUser/${patientId}`} heading={'Добавить диагноз'} data={createReport} setOpen={setOpen} /> : null}
        </div>
    )
}
