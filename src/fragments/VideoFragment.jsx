import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { useGet } from '../hooks/get.hook'
import { useUsers } from '../hooks/users.hook'
import { Video } from '../subpages/Video/Video'

export const VideoFragment = () => {
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
                        <Route key={ i } path={`/panel/telemedicine/video/${id}`} exact>
                            <Video data={ usersData[i] } />
                        </Route>
                    )
                })
            }
        </Switch>
    )
}
