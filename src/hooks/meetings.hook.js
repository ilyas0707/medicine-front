export const useMeetings = (meetings) => {

    const meetingsData = meetings ? meetings.map(({ id, userDoctor, userPatient, dateFrom, dateTo, amountToBePaid, statusPaid }) => {
        const startDate = new Date(dateFrom)
        const endDate = new Date(dateTo)

        return { 
            id: id,
            allDay: false,
            title: `${userPatient.fullname}, ${amountToBePaid} сом`,
            doctorId: userDoctor.id,
            patientId: userPatient.id,
            roomId: 1,
            statusPaid: statusPaid,
            startDate: new Date(startDate.getFullYear() - 1, startDate.getMonth() === 0 ? 12 : startDate.getMonth(), startDate.getDate(), startDate.getHours() + 6, startDate.getMinutes()),
            endDate: new Date(endDate.getFullYear() - 1, endDate.getMonth() === 0 ? 12 : endDate.getMonth(), endDate.getDate(), endDate.getHours() + 6, endDate.getMinutes()),
        }
    }) : []

    const paymentData = meetings ? meetings.map(({ id, userDoctor, userPatient, dateFrom, dateTo, amountToBePaid, statusPaid }) => {
        const startDate = new Date(dateFrom)
        const endDate = new Date(dateTo)

        return { 
            id: id,
            startDate: new Date(startDate.getFullYear() - 1, startDate.getMonth() === 0 ? 12 : startDate.getMonth(), startDate.getDate(), startDate.getHours() + 6, startDate.getMinutes()),
            endDate: new Date(endDate.getFullYear() - 1, endDate.getMonth() === 0 ? 12 : endDate.getMonth(), endDate.getDate(), endDate.getHours() + 6, endDate.getMinutes()),
            doctorName: userDoctor.fullname,
            patientName: userPatient.fullname,
            amountToBePaid: amountToBePaid,
            statusPaid: statusPaid,
        }
    }) : []

    return { meetingsData, paymentData }
}