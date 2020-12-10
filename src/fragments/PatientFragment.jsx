import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import { Patient } from '../subpages/Patient/Patient'

export const PatientFragment = () => {
    const patients = [
        { fullname: 'Shabdan Abjaparov', birthdate: '01/02/2000' , phoneNumber: '555454545' , cardNumber: '642' },
        { fullname: 'Atay Dalbaev', birthdate: '02/03/2001' , phoneNumber: '333232323' , cardNumber: '643' },
        { fullname: 'Ilyas Yangurazov', birthdate: '03/04/2002' , phoneNumber: '888676767' , cardNumber: '644' },
        { fullname: 'Muzafar Yusup', birthdate: '04/05/2003' , phoneNumber: '222464646' , cardNumber: '645' },
        { fullname: 'Daniyar Chekirov', birthdate: '05/06/2004' , phoneNumber: '999111111' , cardNumber: '646' }
    ]

    return (
        <Fragment>
            {
                patients.map(({ cardNumber }, i) => {
                    return (
                        <Route key={ i } path={`/panel/patients/${cardNumber}`} exact>
                            <Patient data={ patients[i] } />
                        </Route>
                    )
                })
            }
        </Fragment>
    )
}
