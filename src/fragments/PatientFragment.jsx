import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import { useGet } from '../hooks/get.hook'
import { useCards } from '../hooks/cards.hook'
import { Patient } from '../subpages/Patient/Patient'

export const PatientFragment = () => {
    const { data, loading } = useGet('api/patientController/getAll')
    const { patientCards } = useCards(data.object)

    if (loading) {
        return <div className="loading"></div>
    }

    return (
        <Fragment>
            {
                patientCards.map(({ id }, i) => {
                    return (
                        <Route key={ i } path={`/panel/patients/${id}`} exact>
                            <Patient data={ patientCards[i] } />
                        </Route>
                    )
                })
            }
        </Fragment>
    )
}
