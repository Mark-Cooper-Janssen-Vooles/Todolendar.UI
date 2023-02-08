import dayjs from "dayjs";

export const computeDaysOfMonth = (dayjsTimeObject: dayjs.Dayjs, currentTime: string) => {
    const daysOfMonth = [0, 0, 0, 0, 0, 0, 0]

    // find out the index of current day in days
    const index = dayjsTimeObject.day()

    if (index === 0) {
        daysOfMonth[0] = dayjsTimeObject.date()
        daysOfMonth[1] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").add(1, 'day').date()
        daysOfMonth[2] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").add(2, 'day').date()
        daysOfMonth[3] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").add(3, 'day').date()
        daysOfMonth[4] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").add(4, 'day').date()
        daysOfMonth[5] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").add(5, 'day').date()
        daysOfMonth[6] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").add(6, 'day').date()
    }

    if (index === 1) {
        daysOfMonth[1] = dayjsTimeObject.date()
        daysOfMonth[0] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").subtract(1, 'day').date()
        daysOfMonth[2] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").add(1, 'day').date()
        daysOfMonth[3] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").add(2, 'day').date()
        daysOfMonth[4] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").add(3, 'day').date()
        daysOfMonth[5] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").add(4, 'day').date()
        daysOfMonth[6] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").add(5, 'day').date()
    }

    if (index === 2) {
        daysOfMonth[2] = dayjsTimeObject.date()
        daysOfMonth[1] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").subtract(1, 'day').date()
        daysOfMonth[0] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").subtract(2, 'day').date()
        daysOfMonth[3] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").add(1, 'day').date()
        daysOfMonth[4] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").add(2, 'day').date()
        daysOfMonth[5] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").add(3, 'day').date()
        daysOfMonth[6] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").add(4, 'day').date()
    }

    if (index === 3) {
        daysOfMonth[3] = dayjsTimeObject.date()
        daysOfMonth[2] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").subtract(1, 'day').date()
        daysOfMonth[1] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").subtract(2, 'day').date()
        daysOfMonth[0] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").subtract(3, 'day').date()
        daysOfMonth[4] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").add(1, 'day').date()
        daysOfMonth[5] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").add(2, 'day').date()
        daysOfMonth[6] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").add(3, 'day').date()
    }

    if (index === 4) {
        daysOfMonth[4] = dayjsTimeObject.date()
        daysOfMonth[3] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").subtract(1, 'day').date()
        daysOfMonth[2] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").subtract(2, 'day').date()
        daysOfMonth[1] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").subtract(3, 'day').date()
        daysOfMonth[0] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").subtract(4, 'day').date()
        daysOfMonth[5] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").add(1, 'day').date()
        daysOfMonth[6] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").add(2, 'day').date()
    }

    if (index === 5) {
        daysOfMonth[5] = dayjsTimeObject.date()
        daysOfMonth[4] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").subtract(1, 'day').date()
        daysOfMonth[3] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").subtract(2, 'day').date()
        daysOfMonth[2] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").subtract(3, 'day').date()
        daysOfMonth[1] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").subtract(4, 'day').date()
        daysOfMonth[0] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").subtract(5, 'day').date()
        daysOfMonth[6] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").add(1, 'day').date()
    }

    if (index === 6) {
        daysOfMonth[6] = dayjsTimeObject.date()
        daysOfMonth[5] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").subtract(1, 'day').date()
        daysOfMonth[4] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").subtract(2, 'day').date()
        daysOfMonth[3] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").subtract(3, 'day').date()
        daysOfMonth[2] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").subtract(4, 'day').date()
        daysOfMonth[1] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").subtract(5, 'day').date()
        daysOfMonth[0] = dayjs(currentTime, "DD-MM-YYYY h:m:s a").subtract(6, 'day').date()
    }

    return daysOfMonth;
}