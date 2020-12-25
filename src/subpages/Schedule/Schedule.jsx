import React, { useState } from 'react'
import Styles from './Schedule.module.css'

import Paper from '@material-ui/core/Paper'
import {
    ViewState,
    GroupingState,
    IntegratedGrouping,
    IntegratedEditing,
    EditingState,
} from '@devexpress/dx-react-scheduler'
import {
    Scheduler,
    Resources,
    Appointments,
    AppointmentTooltip,
    GroupingPanel,
    DayView,
    WeekView,
    Toolbar,
    ViewSwitcher,
    MonthView,
    DragDropProvider,
    AppointmentForm,
    DateNavigator,
    CurrentTimeIndicator,
    ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui'
import { indigo } from '@material-ui/core/colors'
import { locale } from '../../hooks/locale.hook'
// import { usePost } from '../../hooks/post.hook'

export const Schedule = () => {
    // const { postHandler, loading } = usePost('schedule', 'api/meetings/create')
    const appointments = [
        {
            id: 0,
            title: 'Музафар Юсуп',
            members: [1],
            roomId: 1,
            startDate: new Date(2020, 11, 16, 15, 30),
            endDate: new Date(2020, 11, 16, 16, 0),
        },
    ]
    
    const owners = [
        {
            text: 'Динара - Кардиолог',
            id: 1,
            color: indigo,
        },
    ]
    
    const locations = [{ text: '103 каб.', id: 1 }]

    const [meetings, setMeetings] = useState({
        data: appointments
    })

    const resources = [
        {
            fieldName: 'members',
            title: 'Врач',
            instances: owners,
            allowMultiple: true,
        },
        {
            fieldName: 'roomId',
            title: 'Кабинет',
            instances: locations,
        },
    ]

    const grouping = [
        {
            resourceName: 'roomId',
        },
        {
            resourceName: 'members',
        },
    ]

    const commitChanges = ({ added, changed, deleted }) => {
        setMeetings((state) => {
            let { data } = state
            if (added) {
                const startingAddedId =
                    data.length > 0 ? data[data.length - 1].id + 1 : 0
                data = [...data, { id: startingAddedId, ...added }]
            }
            if (changed) {
                data = data.map((appointment) =>
                    changed[appointment.id]
                        ? { ...appointment, ...changed[appointment.id] }
                        : appointment
                )
            }
            if (deleted !== undefined) {
                data = data.filter((appointment) => appointment.id !== deleted)
            }

            console.log(data);

            // postHandler(data)

            return { data }
        })
    }

    return (
        <div className={Styles.schedule}>
            <h2 className={Styles.heading}>Записи</h2>
            <Paper classes={{ root: Styles.paper }}>
                <Scheduler locale={'ru'} data={meetings.data}>
                    <ViewState defaultCurrentViewName="work-week" />
                    <EditingState onCommitChanges={commitChanges} />
                    <GroupingState grouping={grouping} />

                    <DayView
                        displayName="День"
                        startDayHour={8}
                        endDayHour={19}
                        intervalCount={1}
                    />

                    <WeekView
                        name="work-week"
                        displayName="Раб. неделя"
                        excludedDays={[0, 6]}
                        startDayHour={8}
                        endDayHour={19}
                    />
                    <MonthView displayName="Месяц" />

                    <Toolbar locale={'ru'} />
                    <ViewSwitcher locale={'ru'} />
                    <DateNavigator />
                    <Appointments data={meetings.data} />
                    {/* <AllDayPanel messages={locale} /> */}
                    <Resources
                        data={resources}
                        mainResourceName="members"
                    />

                    <IntegratedGrouping />
                    <IntegratedEditing />

                    <ConfirmationDialog messages={locale} />
                    <AppointmentTooltip
                        showOpenButton
                        showCloseButton
                        showDeleteButton
                    />
                    <AppointmentForm messages={locale} />
                    <GroupingPanel />
                    <DragDropProvider />
                    <CurrentTimeIndicator
                        shadePreviousCells={true}
                        shadePreviousAppointments={
                            true
                        }
                        updateInterval={10000}
                    />
                </Scheduler>
            </Paper>
        </div>
    )
}
