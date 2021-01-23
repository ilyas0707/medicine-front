import React, { useState } from 'react'
import { usePost } from '../../hooks/post.hook'
import Styles from './PersonalInfo.module.css'

export const PersonalInfo = ({ cardId, data }) => {
    const { postHandler } = usePost('/panel/patients', `patients/${cardId}`)
    const [edit, setEdit] = useState(false)

    const items = [
        { data: data[0], heading: 'Общие сведения', icon: 'border_color', editable: false },
        { data: data[1], heading: 'Место проживания', icon: null, editable: true },
        { data: data[2], heading: 'Создан', icon: null, editable: false },
    ]

    const initialState = () => {
        let arr = {}

        items[1].data.forEach(({ data, name }) => {
            arr[name] = data
        })

        return arr
    }

    const [form, setForm] = useState(initialState())

    const editPersonalInfo = () => {
        setEdit(!edit)
    }

    const savePersonalInfo = () => {
        const postData = {
            id: cardId,
            address: form
        }

        postHandler(postData, 'api/patientController/updatePatientCard')
    }

    const buttons = [
        { icon: 'save', func: savePersonalInfo },
        { icon: 'border_color', func: editPersonalInfo },
        { icon: 'print', func: () => console.log('print') },
    ]

    const changeHandler = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <div>
            {items.map(({ data, heading, icon, editable }, i) => {
                return (
                    <div key={i}>
                        <h3 className={Styles.heading}>
                            {heading}
                            {icon !== null ?
                                <div className={Styles.buttons}>
                                    {
                                        buttons.map(({ icon, func }, i) => {
                                            return (
                                                <button key={ i } className={`${Styles.button} ${icon === 'save' && !edit ? Styles.hidden : ''}`} onClick={() =>
                                                    func()
                                                }>
                                                    <i className={`material-icons ${Styles.icon}`}>{ icon }</i>
                                                </button>
                                            )
                                        })
                                    }
                                </div> :
                                ''
                            }
                        </h3>
                        <div className={Styles.personalInfo}>
                            {data.map(({ data, label, name }, i) => {
                                return (
                                    <div
                                        key={i}
                                        className={Styles.item}
                                    >
                                        <p className={Styles.label}>
                                            {label}:
                                        </p>
                                        {
                                            edit && editable ?
                                            <input
                                                type="text"
                                                className={Styles.input}
                                                name={name}
                                                placeholder={label}
                                                value={form[name]}
                                                autoComplete="off"
                                                onChange={changeHandler}
                                            /> :
                                            <p className={Styles.value}>
                                                {data}
                                            </p>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
