const { fetchFlights } = require("../services/flightService");
const { fetchHotels } = require("../services/hotelService");

const getFlightOptions = async (req, res) => {
  try {
    const { origin, destination, departureDate, returnDate } = req.query;

    if (!origin || !destination || !departureDate || !returnDate) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const flights = await fetchFlights(origin, destination, departureDate, returnDate);
    res.json({ success: true, flights });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getHotelOptions = async (req, res) => {
  try {
    const { cityCode, checkInDate, checkOutDate } = req.query;

    if (!cityCode || !checkInDate || !checkOutDate) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const hotels = await fetchHotels(cityCode, checkInDate, checkOutDate);
    res.json({ success: true, hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getFlightOptions, getHotelOptions };
