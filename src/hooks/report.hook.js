export const useReport = (report) => {

    const reportData = report ? report.map(({ id, title }) => {
        return { 
            id: id,
            title: title,
        }
    }) : []

    return { reportData }
}