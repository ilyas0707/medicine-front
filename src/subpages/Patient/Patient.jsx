import React, { useState } from 'react'
import { PersonalInfo } from '../../components/PersonalInfo/PersonalInfo'
import { Report } from '../../components/Report/Report'
import Styles from './Patient.module.css'

export const Patient = ({ data }) => {
    const [opened, setOpened] = useState(0)

    const openTab = (id) => {
        setOpened(id)
    }

    const links = [
        { name: 'Личные данные' }, { name: 'История болезни' }, { name: 'Визиты' }
    ]

    const tabs = [
        { component: <PersonalInfo data={ [data.personalInfo, data.personalAddress, data.createdByInfo] } /> },
        { component: <Report patientId={ data.patientId } /> },
        { data: '' },
    ]

    return (
        <div className={Styles.patient}>
            <h2 className={Styles.heading}>Данные пациента</h2>
            <div className={Styles.tabs}>
                {
                    links.map(({name}, i) => {
                        return (
                            <a
                                key={ i }
                                href="/"
                                className={`${Styles.tab} ${opened === i ? Styles.selected : ''}`}
                                onClick={e => {e.preventDefault(); openTab(i)}}>
                                { name }
                            </a>
                        )
                    })
                }
            </div>
            {
                tabs.map(({ component }, i) => {
                    return (
                        <div key={ i } className={`${Styles.block} ${opened === i ? Styles.active : ''}`}>
                            { component }
                        </div>
                    )
                })
            }
        </div>
    )
}
