import React, { useState } from 'react'
import { Meetings } from '../../components/Meetings/Meetings'
import { PersonalInfo } from '../../components/PersonalInfo/PersonalInfo'
import { Report } from '../../components/Report/Report'
import { useDelete } from '../../hooks/delete.hook'
import Styles from './Patient.module.css'

export const Patient = ({ data }) => {
    const { deleteHandler } = useDelete(`patients`)
    const [opened, setOpened] = useState(0)

    const openTab = (id) => {
        setOpened(id)
    }

    const links = [
        { name: 'Личные данные' }, { name: 'История болезни' }, { name: 'Визиты' }
    ]

    const tabs = [
        { component: <PersonalInfo cardId={ data.id } data={ [data.personalInfo, data.personalAddress, data.createdByInfo] } /> },
        { component: <Report patientId={ data.patientId } cardId={ data.id } /> },
        { component: <Meetings patientId={ data.patientId } /> },
    ]

    return (
        <div className={Styles.patient}>
            <h2 className={Styles.heading}>
                Данные пациента
                <button className={Styles.button} onClick={() => {deleteHandler('api/patientController/deletePatientsCard', data.id)}}>
                    <i className={`material-icons ${Styles.icon}`}>delete</i>
                </button>
            </h2>
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
