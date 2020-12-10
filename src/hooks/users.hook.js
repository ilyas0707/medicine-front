export const useUsers = (users) => {

    const usersData = users ? users.map(({ id, fullname, username, roles }) => {
        return { 
            id: id,
            fullname: fullname,
            username: username,
            // eslint-disable-next-line
            role: roles ? roles.includes('ROLE_ADMIN') ? 'Админ' : roles.includes('ROLE_ACCOUNTANT') ? 'Бухгалтер' : roles.includes('ROLE_USER') ? 'Пользователь' : ''
            : ''
        }
    }) : ''

    return { usersData }
}