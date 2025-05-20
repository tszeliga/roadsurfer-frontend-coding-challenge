import { newDate } from "@/utils/date";

const generateWeek = (startDate: Date, endDate: Date, bookings: Array<Booking>) => {
  const start = newDate(startDate);
  const end = newDate(endDate);

  const days: WeekDay[] = [];

  if (end.isBefore(start)) {
    return days;
  }

  let current = start.clone();

  while (current.isBefore(end)) {
    const dayBookings = bookings.filter((booking: Booking) => {
      const newStart = newDate(booking.startDate);
      const newEnd = newDate(booking.endDate);
      const isStartDay = newStart.isSame(current, "day");
      const isEndDay = newEnd.isSame(current, "day");
      return isStartDay || isEndDay;
    });

    days.push({
      date: current.toDate(),
      bookings: dayBookings,
    });

    current = current.add(1, "day");
  }

  return days;
};


export { generateWeek };
