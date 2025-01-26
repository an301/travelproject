const axios = require("axios");
const { AMADEUS_API_KEY, AMADEUS_API_SECRET } = require("../../config/apiKeys");

const getAmadeusAccessToken = async () => {
  try {
    const response = await axios.post("https://test.api.amadeus.com/v1/security/oauth2/token", null, {
      params: {
        grant_type: "client_credentials",
        client_id: AMADEUS_API_KEY,
        client_secret: AMADEUS_API_SECRET,
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.error("Error getting Amadeus access token:", error.message);
    throw new Error("Failed to authenticate with Amadeus API.");
  }
};

const fetchFlights = async (origin, destination, departureDate, returnDate) => {
  try {
    const accessToken = await getAmadeusAccessToken();

    const response = await axios.get("https://test.api.amadeus.com/v2/shopping/flight-offers", {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate: departureDate,
        returnDate: returnDate,
        adults: 1,
        max: 5, // Get up to 5 flight offers
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching flights:", error.message);
    throw new Error("Failed to fetch flight options.");
  }
};

module.exports = { fetchFlights };
