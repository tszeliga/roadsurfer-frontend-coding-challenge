import { describe, it, expect } from 'vitest';
import { generateWeek } from './calendarService';

describe('generateWeek function', () => { // todo

  const startDate = new Date('2025-05-01');
  const endDate = new Date('2025-05-07');
  const bookings = [
    { startDate: '2025-05-02T10:00:00Z', /* other booking details */ },
    { startDate: '2025-05-03T12:00:00Z', /* other booking details */ },
    { startDate: '2025-05-05T08:00:00Z', /* other booking details */ },
  ];

  it('should generate a week of days with correct bookings', () => {
    const result = generateWeek(startDate, endDate, bookings);

    expect(result).toHaveLength(7);

    result.forEach((day, index) => {
      const expectedDate = new Date(startDate);
      expectedDate.setDate(startDate.getDate() + index);

      expect(day.date).toEqual(expectedDate);

      const expectedBookings = bookings.filter(booking => {
        const bookingDate = new Date(booking.startDate);
        return bookingDate.getDate() === expectedDate.getDate();
      });

      expect(day.bookings).toEqual(expectedBookings);
    });
  });

  it('should return an empty array if endDate is before startDate', () => {
    const result = generateWeek(endDate, startDate, bookings);

    expect(result).toEqual([]);
  });

});