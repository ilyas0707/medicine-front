import React from 'react'

export const Patient = ({ data }) => {
    return (
        <div>
            { data.fullname } <br/>
            { data.birthdate } <br/>
            { data.phoneNumber } <br/>
            { data.cardNumber } <br/>
        </div>
    )
}
