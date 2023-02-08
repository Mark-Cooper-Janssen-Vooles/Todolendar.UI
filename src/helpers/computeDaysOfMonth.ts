import dayjs from "dayjs";
import {dayjsFormat} from "../reducers/dateSlice";

export const computeDaysOfMonth = (dayjsTimeObject: dayjs.Dayjs, currentTime: string) => {
    const daysOfMonth = [0, 0, 0, 0, 0, 0, 0]

    // find out the index of current day in days
    const index = dayjsTimeObject.day()

    if (index === 0) {
        daysOfMonth[0] = dayjsTimeObject.date()
        daysOfMonth[1] = dayjs(currentTime, dayjsFormat).add(1, 'day').date()
        daysOfMonth[2] = dayjs(currentTime, dayjsFormat).add(2, 'day').date()
        daysOfMonth[3] = dayjs(currentTime, dayjsFormat).add(3, 'day').date()
        daysOfMonth[4] = dayjs(currentTime, dayjsFormat).add(4, 'day').date()
        daysOfMonth[5] = dayjs(currentTime, dayjsFormat).add(5, 'day').date()
        daysOfMonth[6] = dayjs(currentTime, dayjsFormat).add(6, 'day').date()
    }

    if (index === 1) {
        daysOfMonth[1] = dayjsTimeObject.date()
        daysOfMonth[0] = dayjs(currentTime, dayjsFormat).subtract(1, 'day').date()
        daysOfMonth[2] = dayjs(currentTime, dayjsFormat).add(1, 'day').date()
        daysOfMonth[3] = dayjs(currentTime, dayjsFormat).add(2, 'day').date()
        daysOfMonth[4] = dayjs(currentTime, dayjsFormat).add(3, 'day').date()
        daysOfMonth[5] = dayjs(currentTime, dayjsFormat).add(4, 'day').date()
        daysOfMonth[6] = dayjs(currentTime, dayjsFormat).add(5, 'day').date()
    }

    if (index === 2) {
        daysOfMonth[2] = dayjsTimeObject.date()
        daysOfMonth[1] = dayjs(currentTime, dayjsFormat).subtract(1, 'day').date()
        daysOfMonth[0] = dayjs(currentTime, dayjsFormat).subtract(2, 'day').date()
        daysOfMonth[3] = dayjs(currentTime, dayjsFormat).add(1, 'day').date()
        daysOfMonth[4] = dayjs(currentTime, dayjsFormat).add(2, 'day').date()
        daysOfMonth[5] = dayjs(currentTime, dayjsFormat).add(3, 'day').date()
        daysOfMonth[6] = dayjs(currentTime, dayjsFormat).add(4, 'day').date()
    }

    if (index === 3) {
        daysOfMonth[3] = dayjsTimeObject.date()
        daysOfMonth[2] = dayjs(currentTime, dayjsFormat).subtract(1, 'day').date()
        daysOfMonth[1] = dayjs(currentTime, dayjsFormat).subtract(2, 'day').date()
        daysOfMonth[0] = dayjs(currentTime, dayjsFormat).subtract(3, 'day').date()
        daysOfMonth[4] = dayjs(currentTime, dayjsFormat).add(1, 'day').date()
        daysOfMonth[5] = dayjs(currentTime, dayjsFormat).add(2, 'day').date()
        daysOfMonth[6] = dayjs(currentTime, dayjsFormat).add(3, 'day').date()
    }

    if (index === 4) {
        daysOfMonth[4] = dayjsTimeObject.date()
        daysOfMonth[3] = dayjs(currentTime, dayjsFormat).subtract(1, 'day').date()
        daysOfMonth[2] = dayjs(currentTime, dayjsFormat).subtract(2, 'day').date()
        daysOfMonth[1] = dayjs(currentTime, dayjsFormat).subtract(3, 'day').date()
        daysOfMonth[0] = dayjs(currentTime, dayjsFormat).subtract(4, 'day').date()
        daysOfMonth[5] = dayjs(currentTime, dayjsFormat).add(1, 'day').date()
        daysOfMonth[6] = dayjs(currentTime, dayjsFormat).add(2, 'day').date()
    }

    if (index === 5) {
        daysOfMonth[5] = dayjsTimeObject.date()
        daysOfMonth[4] = dayjs(currentTime, dayjsFormat).subtract(1, 'day').date()
        daysOfMonth[3] = dayjs(currentTime, dayjsFormat).subtract(2, 'day').date()
        daysOfMonth[2] = dayjs(currentTime, dayjsFormat).subtract(3, 'day').date()
        daysOfMonth[1] = dayjs(currentTime, dayjsFormat).subtract(4, 'day').date()
        daysOfMonth[0] = dayjs(currentTime, dayjsFormat).subtract(5, 'day').date()
        daysOfMonth[6] = dayjs(currentTime, dayjsFormat).add(1, 'day').date()
    }

    if (index === 6) {
        daysOfMonth[6] = dayjsTimeObject.date()
        daysOfMonth[5] = dayjs(currentTime, dayjsFormat).subtract(1, 'day').date()
        daysOfMonth[4] = dayjs(currentTime, dayjsFormat).subtract(2, 'day').date()
        daysOfMonth[3] = dayjs(currentTime, dayjsFormat).subtract(3, 'day').date()
        daysOfMonth[2] = dayjs(currentTime, dayjsFormat).subtract(4, 'day').date()
        daysOfMonth[1] = dayjs(currentTime, dayjsFormat).subtract(5, 'day').date()
        daysOfMonth[0] = dayjs(currentTime, dayjsFormat).subtract(6, 'day').date()
    }

    return daysOfMonth;
}