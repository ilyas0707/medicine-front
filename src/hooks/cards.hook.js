export const useCards = (cards) => {
    const patientCards = cards
        ? cards.map(({ id, patient, address, createdBy }) => {
              const dateFormatted = new Date(patient.birthDate)
              const personalInfo = [
                  {
                      data: patient.fullname,
                      label: 'Полное имя',
                      name: 'fullname',
                  },
                  { data: patient.username, label: 'Логин', name: 'username' },
                  {
                      data: patient.email,
                      label: 'Электронная почта',
                      name: 'email',
                  },
                  {
                      data: patient.phoneNumber,
                      label: 'Сотовый телефон',
                      name: 'phoneNumber',
                  },
                  {
                      data: `${dateFormatted.getDate()}/${
                          dateFormatted.getMonth() + 1
                      }/${dateFormatted.getFullYear()}`,
                      label: 'Дата рождения',
                      name: 'birthDate',
                  },
                  {
                      data:
                          patient.gender === 'MALE'
                              ? 'Мужской'
                              : patient.gender === 'FEMALE'
                              ? 'Женский'
                              : '',
                      label: 'Пол',
                      name: 'gender',
                  },
              ]

              const personalAddress = [
                  { data: address.district, label: 'Район', name: 'district' },
                  { data: address.city, label: 'Город', name: 'city' },
                  {
                      data: address.inhabitedLocality,
                      label: 'Населенный пункт',
                      name: 'inhabitedLocality',
                  },
                  { data: address.street, label: 'Улица', name: 'street' },
                  { data: address.house, label: 'Дом', name: 'house' },
                  {
                      data: address.apartment,
                      label: 'Квартира',
                      name: 'apartment',
                  },
                  {
                      data: address.homeTelephone,
                      label: 'Дом. телефон',
                      name: 'homeTelephone',
                  },
              ]

              const createdByInfo = [
                  {
                      data: createdBy.fullname,
                      label: 'Создан',
                      name: 'fullname',
                  },
              ]

              const patientId = patient.id

              return {
                  id,
                  patientId,
                  personalInfo,
                  personalAddress,
                  createdByInfo,
              }
          })
        : []

    return { patientCards }
}
