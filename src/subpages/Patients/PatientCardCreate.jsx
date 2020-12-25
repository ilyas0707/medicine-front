import React from 'react'
import { Form } from '../../components/Form/Form'
import Styles from './PatientCardCreate.module.css'

export const PatientCardCreate = () => {
    const createPatient = [
        { type: 'text', name: 'fullname', label: 'Имя' },
        { type: 'email', name: 'email', label: 'Email' },
        { type: 'number', name: 'phoneNumber', label: 'Номер телефона' },
        { type: 'date', name: 'birthDate', label: 'Дата рождения' },
        {
            select: [
                {
                    name: 'gender',
                    options: [
                        [
                            { label: 'Пол', id: 'undefined' },
                            { label: 'Мужской', id: 'MALE' },
                            { label: 'Женский', id: 'FEMALE' },
                        ],
                    ],
                },
            ],
            name: 'gender',
        },
    ]

    const createAddress = [
        { type: 'text', name: 'district', label: 'Район' },
        { type: 'text', name: 'city', label: 'Город' },
        { type: 'text', name: 'inhabitedLocality', label: 'Населенный пункт' },
        { type: 'text', name: 'street', label: 'Улица' },
        { type: 'text', name: 'house', label: 'Дом' },
        { type: 'text', name: 'apartment', label: 'Квартира' },
        { type: 'text', name: 'homeTelephone', label: 'Дом. телефон' },
    ]

    function setPatient(form, name, value) {
        const patientNames = createPatient.map(({ name }) => {
            return name
        })
        const addressNames = createAddress.map(({ name }) => {
            return name
        })

        return {
            patient: {
                ...form.patient,
                [patientNames.includes(name) ? name : 'delete']:
                    name === 'birthDate'
                        ? new Date(value).toISOString()
                        : value,
            },
            address: {
                ...form.address,
                [addressNames.includes(name) ? name : 'delete']: value,
            },
        }
    }

    return (
        <div className={Styles.create}>
            <h2 className={Styles.heading}>Создать пациента</h2>
            <Form
                component={'createPatientCard'}
                data={[createPatient, createAddress]}
                url={'api/patientController/create'}
                set={setPatient}
            />
        </div>
    )
}
