type Station = {
  id: string
  name: string
  bookings: Booking[] | []
}

type Booking = {
  id: string
  pickupReturnStationId: string
  customerName: string
  startDate: Date
  endDate: Date
}

type WeekDay = {
    date: Date;
    bookings: Booking[];
  }