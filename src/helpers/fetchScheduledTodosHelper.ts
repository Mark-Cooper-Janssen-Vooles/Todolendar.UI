export const fixLength = (str: string) => {
    if (str.length < 2 ) {
        return "0" + str
    }

    return str
}

export const fixStartMonth = (month: string, currentDay: string, startDay: string) => {
    if (startDay > currentDay) {
        const monthNum = parseInt(month) - 1 // decrement startMonth by 1
        return fixLength(monthNum.toString())
    }
    return month
}

export const fixEndMonth = (month: string, currentDay: string, endDay: string) => {
    if (currentDay > endDay) {
        const monthNum = parseInt(month) + 1 // increment endMonth by 1
        return fixLength(monthNum.toString())
    }

    return month
}
