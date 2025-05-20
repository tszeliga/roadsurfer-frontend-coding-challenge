import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import isBetween from "dayjs/plugin/isBetween"
import isoWeek from 'dayjs/plugin/isoWeek';
import 'dayjs/locale/en';
import isToday from 'dayjs/plugin/isToday'

dayjs.locale('en');
dayjs.extend(isoWeek);
dayjs.extend(isBetween);
dayjs.extend(isToday);


const formatDate = (date: Date | Dayjs, format = 'DD-MM-YYYY') : string => {
    return dayjs(date).format(format);
}

const duration = (start: Date | Dayjs, end: Date | Dayjs, unit: dayjs.UnitType) : number => {
    return dayjs(end).diff(dayjs(start), unit);
}

const isDayToday = (date: Date | Dayjs): boolean => {
    return dayjs(date).isToday();
}

export {
    formatDate,
    duration,
    isDayToday as isToday,
    dayjs as newDate
};
