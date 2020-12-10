import React from 'react';
import Styles from './App.module.css';
import { BrowserRouter as Router } from "react-router-dom"
import { useRoutes } from "./routes"
import { useAuth } from "./hooks/auth.hook"
import { AuthContext } from "./context/AuthContext"

export const App = () => {
	const { login, logout, status } = useAuth()
	const isAuthentificated = !!status
	const routes = useRoutes(isAuthentificated)
  	return (
		<AuthContext.Provider value={{
			login, logout, status, isAuthentificated
		}}>
			<Router>
				<div className={Styles.app}>
					{ isAuthentificated }
					{ routes }
				</div>
			</Router>
		</AuthContext.Provider>
  	)
}