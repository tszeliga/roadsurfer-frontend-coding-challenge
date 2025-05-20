import { newDate } from "./../../../utils/date";
import type { Dayjs } from "dayjs";

const getBookingsForDay = (currentDate: Dayjs, bookings: Array<Booking>): Booking[] => {
  return bookings.filter((booking: Booking) => {
    const bookingStart = newDate(booking.startDate);
    const bookingEnd = newDate(booking.endDate);
    
    return (
      bookingStart.isSame(currentDate, "day") ||
      bookingEnd.isSame(currentDate, "day")
    );
  });
}

const generateWeek = (startDate: Date, endDate: Date, bookings: Array<Booking>) => {
  let start = newDate(startDate);
  const end = newDate(endDate);
  const days: WeekDay[] = [];

  if (end.isBefore(start)) {
    return days;
  }

  while (start.isBefore(end)) {
    const dayBookings = getBookingsForDay(start, bookings);

    days.push({
      date: start.toDate(),
      bookings: dayBookings,
    });

    start = start.add(1, "day");
  }

  return days;
};


export { generateWeek, getBookingsForDay };
