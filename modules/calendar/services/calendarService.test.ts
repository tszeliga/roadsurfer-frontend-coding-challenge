import { describe, it, expect } from 'vitest';
import { newDate } from "./../../../utils/date";
import { getBookingsForDay, generateWeek } from "./calendarService"; 

describe("getBookingsForDay", () => {
  it("should return bookings that start on the current day", () => {
    const currentDate = newDate("2023-05-20");
    const bookings = [
      { id: '1', startDate: new Date("2023-05-20T08:00:00"), endDate: new Date("2023-05-21T08:00:00"), pickupReturnStationId: "1", customerName: 'Test' },
      { id: '2', startDate: new Date("2023-05-21T08:00:00"), endDate: new Date("2023-05-22T08:00:00"), pickupReturnStationId: "1", customerName: 'Test' },
    ];

    const result = getBookingsForDay(currentDate, bookings);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("should return bookings that end on the current day", () => {
    const currentDate = newDate("2023-05-20");
    const bookings = [
      { id: '1', startDate: new Date("2023-05-19"), endDate: new Date("2023-05-20"), pickupReturnStationId: "1", customerName: "Test" },
      { id: '2', startDate: new Date("2023-05-21"), endDate: new Date("2023-05-22"), pickupReturnStationId: "1", customerName: "Test" },
    ];

    const result = getBookingsForDay(currentDate, bookings);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });


  it("should return bookings that start or end on the current day", () => {
    const currentDate = newDate("2023-05-20");
    const bookings = [
      { id: "1", startDate: new Date("2023-05-20"), endDate: new Date("2023-05-21"), pickupReturnStationId: "1", customerName: "Test" },
      { id: "2", startDate: new Date("2023-05-19"), endDate: new Date("2023-05-20"), pickupReturnStationId: "1", customerName: "Test" },
      { id: "3", startDate: new Date("2023-05-21"), endDate: new Date("2023-05-22"), pickupReturnStationId: "1", customerName: "Test" },
    ];

    const result = getBookingsForDay(currentDate, bookings);

    expect(result).toHaveLength(2);
    expect(result.map((b) => b.id)).toEqual(["1", "2"]);
  });

  it("should return an empty array when no bookings start or end on the current day", () => {
    const currentDate = newDate("2023-05-20");
    const bookings = [
      { id: "1", startDate: new Date("2023-05-21"), endDate: new Date("2023-05-22"), pickupReturnStationId: "1", customerName: "Test" },
      { id: "2", startDate: new Date("2023-05-22"), endDate: new Date("2023-05-23"), pickupReturnStationId: "1", customerName: "Test" },
    ];

    const result = getBookingsForDay(currentDate, bookings);

    expect(result).toHaveLength(0);
  });

  it("should return an empty array when there are no bookings", () => {
    const currentDate = newDate("2023-05-20");
    const bookings: Array<Booking> = [];

    const result = getBookingsForDay(currentDate, bookings);

    expect(result).toHaveLength(0);
  });
});



describe("generateWeek", () => {
    it("should generate days from startDate (inclusive) to endDate (exclusive)", () => {
        const startDate = new Date("2023-05-20");
        const endDate = new Date("2023-05-23");
        const bookings: Booking[] = [];

        const result = generateWeek(startDate, endDate, bookings);

        expect(result).toHaveLength(3);
        expect(result[0].date.toISOString().slice(0, 10)).toBe("2023-05-20");
        expect(result[1].date.toISOString().slice(0, 10)).toBe("2023-05-21");
        expect(result[2].date.toISOString().slice(0, 10)).toBe("2023-05-22");
    });

    it("should return an empty array if endDate is before startDate", () => {
        const startDate = new Date("2023-05-23");
        const endDate = new Date("2023-05-20");
        const bookings: Booking[] = [];

        const result = generateWeek(startDate, endDate, bookings);

        expect(result).toHaveLength(0);
    });

    it("should include bookings that start or end on each day", () => {
        const startDate = new Date("2023-05-20");
        const endDate = new Date("2023-05-23");
        const bookings: Booking[] = [
            {
                id: "1",
                startDate: new Date("2023-05-20"),
                endDate: new Date("2023-05-21"),
                pickupReturnStationId: "1",
                customerName: "Test",
            },
            {
                id: "2",
                startDate: new Date("2023-05-21"),
                endDate: new Date("2023-05-22"),
                pickupReturnStationId: "1",
                customerName: "Test",
            },
            {
                id: "3",
                startDate: new Date("2023-05-19"),
                endDate: new Date("2023-05-20"),
                pickupReturnStationId: "1",
                customerName: "Test",
            },
        ];

        const result = generateWeek(startDate, endDate, bookings);

        expect(result[0].bookings.map(b => b.id).sort()).toEqual(["1", "3"]);
        expect(result[1].bookings.map(b => b.id).sort()).toEqual(["1", "2"]);
        expect(result[2].bookings.map(b => b.id)).toEqual(["2"]);
    });

    it("should return empty bookings array for days with no bookings", () => {
        const startDate = new Date("2023-05-20");
        const endDate = new Date("2023-05-22");
        const bookings: Booking[] = [
            {
                id: "1",
                startDate: new Date("2023-05-25"),
                endDate: new Date("2023-05-26"),
                pickupReturnStationId: "1",
                customerName: "Test",
            },
        ];

        const result = generateWeek(startDate, endDate, bookings);

        expect(result[0].bookings).toHaveLength(0);
        expect(result[1].bookings).toHaveLength(0);
    });

    it("should handle empty bookings array", () => {
        const startDate = new Date("2023-05-20");
        const endDate = new Date("2023-05-22");
        const bookings: Booking[] = [];

        const result = generateWeek(startDate, endDate, bookings);

        expect(result[0].bookings).toHaveLength(0);
        expect(result[1].bookings).toHaveLength(0);
    });
});
