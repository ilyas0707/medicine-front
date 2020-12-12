import React from 'react'
import Styles from './Patient.module.css'

export const Patient = ({ data }) => {
    return (
        <div className={Styles.patient}>
            <h2 className={Styles.heading}>Данные пациента</h2>
            { data.fullname } <br/>
            { data.birthdate } <br/>
            { data.phoneNumber } <br/>
            { data.cardNumber } <br/>
        </div>
    )
}
