import React, { useState } from 'react'
import Styles from './Chat.module.css'

export const Chat = ({ data }) => {
    const [form, setForm] = useState('')
    const [messages, setMessages] = useState([])

    const changeHandler = ({ currentTarget = {} }) => {
        const { value } = currentTarget
        setForm(value)
    }

    const sendMessage = () => {
        const currentDate = new Date()
        if (form !== '') {
            setMessages([...messages, {"text": form, "time": `${currentDate.getHours()}:${currentDate.getMinutes()}` }])
        } else {
            setMessages([...messages])
        }
        setForm('')
    }

    return (
        <div className={Styles.chat}>
            <h2 className={Styles.heading}>{ data.fullname }</h2>
            <div className={Styles.body}>
                {
                    messages.map(({ text, time }, i) => {
                        return (
                            <div key={ i } className={Styles.message}>
                                { text }
                                <span>{ time }</span>
                            </div>
                        )
                    })
                }
            </div>
            <form action="#" className={Styles.form}>
                <input value={form} type="text" placeholder="Написать..." className={Styles.input} onChange={changeHandler} />
                <button type="submit" className={Styles.button} onClick={e => {e.preventDefault(); sendMessage()}}>
                    <i className={`material-icons ${Styles.icon}`}>send</i>
                </button>
            </form>
        </div>
    )
}