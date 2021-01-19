import React from 'react'
import { useGet } from '../../hooks/get.hook'
import Styles from './Report.module.css'

export const Report = ({ patientId }) => {
    const { data, loading } = useGet(`api/diagnose/getByPatient/${patientId}`)

    console.log(data);

    return (
        <div className={Styles.report}>
            <h3 className={Styles.heading}>
                Диагнозы
                <button className={Styles.button}>
                    <i className={`material-icons ${Styles.icon}`}>border_color</i>
                </button>
            </h3>
        </div>
    )
}
