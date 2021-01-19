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
import { locale } from '../../hooks/locale.hook'
import { useGet } from '../../hooks/get.hook'
import { useUsers } from '../../hooks/users.hook'
import { useMeetings } from '../../hooks/meetings.hook'
import { usePost } from '../../hooks/post.hook'
import { useDelete } from '../../hooks/delete.hook'

export const Schedule = () => {
    const meetingsGet = useGet('api/meeting/getAll')
    const usersGet = useGet('api/user/getAll')
    const { meetingsData } = useMeetings(meetingsGet.data.object)
    const { usersData } = useUsers(usersGet.data.object)
    const { postHandler } = usePost('schedule')
    const { deleteHandler } = useDelete('schedule')

    const doctors = usersData
        ? usersData
              .filter((element) => {
                  return element.role === 'Врач'
              })
              .map(({ id, fullname }) => {
                  return {
                      id: id,
                      text: fullname,
                      color: '#F2D857',
                  }
              })
        : [
              {
                  text: 'Загружаем...',
                  id: 1,
                  color: '#F2D857',
              },
          ]

    const patients = usersData
        ? usersData
              .filter((element) => {
                  return element.role === 'Пациент'
              })
              .map(({ id, fullname }) => {
                  return {
                      id: id,
                      text: fullname,
                      color: '#F2AF5C',
                  }
              })
        : [
              {
                  text: 'Загружаем...',
                  id: 1,
                  color: '#F2AF5C',
              },
          ]

    const locations = [{ text: '103 каб.', id: 1 }]

    const appointments = meetingsData

    const Appointment = ({ children, style, ...restProps }) => {
        return (
            <Appointments.Appointment
                {...restProps}
                style={{
                    ...style,
                    backgroundColor:
                        restProps.data.statusPaid === 1 ? '#66ff99' : '',
                    borderRadius: '3px',
                }}
            >
                {children}
            </Appointments.Appointment>
        )
    }

    const TextEditor = (props) => {
        // eslint-disable-next-line react/destructuring-assignment
        if (props.type === 'multilineTextEditor') {
            return null
        }
        return <AppointmentForm.TextEditor {...props} />
    }

    const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
        const onAmountToBePaidChange = (nextValue) => {
            onFieldChange({ amountToBePaid: nextValue })
        }

        return (
            <AppointmentForm.BasicLayout
                appointmentData={appointmentData}
                onFieldChange={onFieldChange}
                {...restProps}
            >
                <AppointmentForm.Label text="Стоимость" type="title" />
                <AppointmentForm.TextEditor
                    type="numberEditor"
                    value={appointmentData.amountToBePaid}
                    onValueChange={onAmountToBePaidChange}
                    placeholder="Стоимость"
                />
            </AppointmentForm.BasicLayout>
        )
    }

    const [meetings, setMeetings] = useState({
        data: appointments,
    })

    const resources = [
        {
            fieldName: 'doctorId',
            title: 'Врач',
            instances: doctors,
        },
        {
            fieldName: 'patientId',
            title: 'Пациент',
            instances: patients,
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
            resourceName: 'doctorId',
        },
    ]

    const commitChanges = ({ added, changed, deleted }) => {
        setMeetings((state) => {
            let { data } = state

            if (added) {
                const startingAddedId =
                    data.length > 0 ? data[data.length - 1].id + 1 : 0
                data = [{ id: startingAddedId, ...added }]

                const dataFactored = {
                    dateFrom: new Date(data[0].startDate).toISOString(),
                    dateTo: new Date(data[0].endDate).toISOString(),
                    amountToBePaid: +data[0].amountToBePaid,
                }

                postHandler(
                    dataFactored,
                    `api/meeting/create/${data[0].patientId}/${data[0].doctorId}`
                )
            }
            // if (changed) {
            //     data = data.map((appointment) =>
            //         changed[appointment.id]
            //             ? { ...appointment, ...changed[appointment.id] }
            //             : appointment
            //     )
            // }
            if (deleted !== undefined) {
                const deletedId = appointments.filter(
                    (appointment) => appointment.id === deleted
                )

                deleteHandler('api/meeting/delete', deletedId[0].id)
            }

            return { data }
        })
    }

    if (usersGet.loading || meetingsGet.loading || doctors.length < 2) {
        return <div className="loading"></div>
    }

    return (
        <div className={Styles.schedule}>
            <h2 className={Styles.heading}>Записи</h2>
            <Paper classes={{ root: Styles.paper }}>
                <Scheduler locale={'ru'} data={appointments}>
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
                    <Appointments
                        data={meetings.data}
                        appointmentComponent={Appointment}
                    />
                    {/* <AllDayPanel messages={locale} /> */}
                    <Resources data={resources} mainResourceName="doctorId" />

                    <IntegratedGrouping />
                    <IntegratedEditing />

                    <ConfirmationDialog
                        messages={locale}
                        ignoreDelete
                    />
                    <AppointmentTooltip
                        // showOpenButton
                        showCloseButton
                        showDeleteButton
                    />
                    <AppointmentForm
                        messages={locale}
                        basicLayoutComponent={BasicLayout}
                        textEditorComponent={TextEditor}
                    />
                    <GroupingPanel />
                    <DragDropProvider />
                    <CurrentTimeIndicator
                        shadePreviousCells={true}
                        shadePreviousAppointments={true}
                        updateInterval={10000}
                    />
                </Scheduler>
            </Paper>
        </div>
    )
}
