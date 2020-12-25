import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Styles from './Scene.module.css'

import { Profile } from '../../subpages/Profile/Profile'
import { CreateUser } from '../../subpages/CreateUser/CreateUser'
import { ChangePassword } from '../../subpages/ChangePassword/ChangePassword'
import { Schedule } from '../../subpages/Schedule/Schedule'
import { Patients } from '../../subpages/Patients/Patients'
import { PatientCardCreate } from '../../subpages/Patients/PatientCardCreate'
import { PatientFragment } from '../../fragments/PatientFragment'

export const Scene = () => {
    return (
        <div className={Styles.scene}>
            <Switch>
                <Route path="/panel/profile" exact>
                    <Profile />
                </Route>
                <Route path="/panel/profile/createUser" exact>
                    <CreateUser />
                </Route>
                <Route path="/panel/profile/changePassword" exact>
                    <ChangePassword />
                </Route>
                <Route path="/panel/schedule" exact>
                    <Schedule />
                </Route>
                <Route path="/panel/patients" exact>
                    <Patients />
                </Route>
                <Route path="/panel/patients/patientCreate" exact>
                    <PatientCardCreate />
                </Route>
                <PatientFragment />
            </Switch>
        </div>
    )
}