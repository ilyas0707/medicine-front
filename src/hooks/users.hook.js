export const useUsers = (users) => {

    const usersData = users ? users.map(({ id, fullname, username, roles }) => {
        return { 
            id: id,
            fullname: fullname,
            username: username,
            // eslint-disable-next-line
            role: roles ? roles.includes('ROLE_ADMIN') ? 'Админ' : 
            roles.includes('ROLE_CASHIER') ? 'Кассир' : 
            roles.includes('ROLE_RECEPTION') ? 'Приемная' : 
            roles.includes('ROLE_DOCTOR') ? 'Врач' : 
            roles.includes('ROLE_PATIENT') ? 'Пациент' : ''
            : ''
        }
    }) : []

    // const patients = users ? users
    // .filter(el => {return el.roles.includes('ROLE_PATIENT')})
    // .map(({ id, fullname, username, email, phoneNumber, birthDate, gender }) => {
    //     const dateFormatted = new Date(birthDate)
    //     return { 
    //         id: id,
    //         fullname: fullname,
    //         username: username,
    //         email: email,
    //         phoneNumber: phoneNumber,
    //         birthDate: `${ dateFormatted.getDate() }/${ dateFormatted.getMonth() + 1 }/${ dateFormatted.getFullYear() }`,
    //         gender: gender
    //     }
    // }) : ''

    return { usersData }
}