export const useCards = (cards) => {
    const patientCards = cards
        ? cards.map(({ id, patient, address, createdBy }) => {
              const dateFormatted = new Date(patient.birthDate)
              const personalInfo = [
                  {
                      fullname: { data: patient.fullname, label: 'Полное имя' },
                      username: { data: patient.username, label: 'Логин' },
                      email: {
                          data: patient.email,
                          label: 'Электронная почта',
                      },
                      phoneNumber: {
                          data: patient.phoneNumber,
                          label: 'Сотовый телефон',
                      },
                      birthDate: {
                          data: `${dateFormatted.getDate()}/${
                              dateFormatted.getMonth() + 1
                          }/${dateFormatted.getFullYear()}`,
                          label: 'Дата рождения',
                      },
                      gender: {
                          data:
                              patient.gender === 'MALE'
                                  ? 'Мужской'
                                  : patient.gender === 'FEMALE'
                                  ? 'Женский'
                                  : '',
                          label: 'Пол',
                      },
                  },
              ]

              const personalAddress = [
                  {
                      district: { data: address.district, label: 'Район' },
                      city: { data: address.city, label: 'Город' },
                      inhabitedLocality: {
                          data: address.inhabitedLocality,
                          label: 'Населенный пункт',
                      },
                      street: { data: address.street, label: 'Улица' },
                      house: { data: address.house, label: 'Дом' },
                      apartment: { data: address.apartment, label: 'Квартира' },
                      homeTelephone: {
                          data: address.homeTelephone,
                          label: 'Дом. телефон',
                      },
                  },
              ]

              const createdByInfo = [
                  {
                      fullname: { data: createdBy.fullname, label: 'Создан' },
                  },
              ]

              const patientId = patient.id

              return { id, patientId, personalInfo, personalAddress, createdByInfo }
          })
        : []

    return { patientCards }
}
