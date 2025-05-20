import axios from "axios";

const API_URL = "//605c94c36d85de00170da8b4.mockapi.io";

const fetchStations = async (): Promise<Station[]> => {
  try {
    const response = await axios.get<Station[]>(`${API_URL}/stations`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stations:", error);
    throw error;
  }
};

const fetchBooking = async (stationId: string, bookingId: string): Promise<Booking> => {
  try {
    const response = await axios.get<Booking>(
      `${API_URL}/stations/${stationId}/bookings/${bookingId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw error;
  }
};

export { fetchStations, fetchBooking };
