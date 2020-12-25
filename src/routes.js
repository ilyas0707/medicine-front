import React, { Fragment } from "react"
import Styles from "./App.module.css"
import { Switch, Route, Redirect } from "react-router-dom"
import { Auth } from "./pages/Auth/Auth"
import { Dashboard } from "./pages/Dashboard/Dashboard"

export const useRoutes = (isAuthentificated) => {
    if (isAuthentificated) {
        return(
            <Fragment>
                <div className={Styles.dashboard}>
                    <Dashboard />
                </div>
                <Redirect to="/panel/profile" />
            </Fragment>
        )
    }

    return(
        <Switch>
            <Route path="/" exact>
                <div className={Styles.auth}>
                    <Auth />
                </div>
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}