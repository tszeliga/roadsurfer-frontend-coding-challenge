import { defineStore } from "pinia";
import { fetchStations } from "../services/bookingsService.api";
import { generateWeek } from "../services/calendarService";
import { newDate } from "@/utils/date";

export const useCalendarStore = defineStore("calendar", () => {
  const selectedStation = ref<Station | null>(null);
  const selectedStationName = computed((): string => selectedStation.value?.name || "");
  const stationsList = ref<Station[]>([]);
  const bookings = ref<Booking[]>([]);
  const startDate = ref<Date>(newDate("2020-10-11T00:20:46.856Z").startOf("isoWeek").toDate()); // fixed date to have any bookings without need to going back too much to the past
  // const startDate = ref<Date>(newDate().startOf("isoWeek").toDate()); // current week
  const endDate = computed<Date>(() => newDate(startDate.value).endOf("isoWeek").toDate());

  const week: Ref<WeekDay[]> = computed((): WeekDay[] => {
    return generateWeek(startDate.value, endDate.value, bookings.value);
  });

  function selectStation(station: Station): void {
    selectedStation.value = station;
    bookings.value = station?.bookings || [];
  }

  async function fetch(): Promise<void> {
    try {
      const data: Station[] = await fetchStations();
      stationsList.value = data;
    } catch (error) {
      console.error("Error fetching stations:", error);
    }
  }

  function getSelectedStationBookings(): Booking[] {
    return bookings.value.filter((booking: Booking) => {
      return newDate(booking.startDate).isBetween(
        newDate(startDate.value),
        newDate(endDate.value),
        "day"
      );
    });
  }

  function prevWeek(): void {
    startDate.value = newDate(startDate.value).subtract(1, "week").toDate();
  }

  function nextWeek():void {
    startDate.value = newDate(startDate.value).add(1, "week").toDate();
  }

   function thisWeek(): void {
    startDate.value = newDate().startOf("isoWeek").toDate()
  }

  onBeforeMount(():void => {
    fetch();
  });

  return {
    selectedStation,
    bookings,
    selectStation,
    startDate,
    endDate,
    nextWeek,
    prevWeek,
    thisWeek,
    fetchStations,
    getSelectedStationBookings,
    stationsList,
    week,
    selectedStationName
  };
});
