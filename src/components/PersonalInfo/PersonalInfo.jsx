import React from 'react'
import Styles from './PersonalInfo.module.css'

export const PersonalInfo = ({ data }) => {
    const items = [
        { data: data[0], heading: 'Общие сведения' },
        { data: data[1], heading: 'Место проживания' },
        { data: data[2], heading: 'Создан' },
    ]
    return (
        <div>
            {items.map(({ data, heading }, i) => {
                return (
                    <div key={i}>
                        <h3 className={Styles.heading}>{heading}</h3>
                        <div className={Styles.personalInfo}>
                            {data.map((obj) => {
                                return Object.entries(obj).map((el) => {
                                    el.shift()
                                    return el.map(({ data, label }, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className={Styles.item}
                                            >
                                                <p className={Styles.label}>
                                                    {label}:
                                                </p>
                                                <p className={Styles.value}>
                                                    {data}
                                                </p>
                                            </div>
                                        )
                                    })
                                })
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
