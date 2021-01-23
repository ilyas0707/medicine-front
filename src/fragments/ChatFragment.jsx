import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { useGet } from '../hooks/get.hook'
import { useUsers } from '../hooks/users.hook'
import { Chat } from '../subpages/Chat/Chat'

export const ChatFragment = () => {
    const { data, loading } = useGet('api/user/getAll')
    const { usersData } = useUsers(data.object)

    if (loading) {
        return <div className="loading"></div>
    }

    return (
        <Switch>
            {
                usersData.map(({ id }, i) => {
                    return (
                        <Route key={ i } path={`/panel/telemedicine/chat/${id}`} exact>
                            <Chat data={ usersData[i] } />
                        </Route>
                    )
                })
            }
        </Switch>
    )
}
