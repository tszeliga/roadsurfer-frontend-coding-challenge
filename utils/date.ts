import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import isBetween from "dayjs/plugin/isBetween"
dayjs.extend(isBetween);

const formatDate = (date: Date | Dayjs, format = 'DD-MM-YYYY') : string => {
    return dayjs(date).format(format);
}

export {
    formatDate,
    dayjs as newDate
};
