const axios = require("axios");
const { AMADEUS_API_KEY, AMADEUS_API_SECRET } = require("../../config/apiKeys");

const getAmadeusAccessToken = async () => {
  try {
    const response = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: AMADEUS_API_KEY,
        client_secret: AMADEUS_API_SECRET,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("🔴 ERROR: Failed to get Amadeus Access Token:", error.response?.data || error.message);
    throw new Error("Amadeus authentication failed.");
  }
};

const getHotelIds = async (accessToken, cityCode) => {
  try {
    const response = await axios.get(
      "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { cityCode: cityCode },
      }
    );

    const hotelIds = response.data.data.map(hotel => hotel.hotelId).slice(0, 3);

    if (hotelIds.length === 0) {
      throw new Error("No hotels found for the given city.");
    }

    console.log("✅ Hotel IDs found:", hotelIds);
    return hotelIds;
  } catch (error) {
    console.error("🔴 ERROR: Fetching Hotel IDs Failed:", error.response?.data || error.message);
    throw new Error("Failed to fetch hotel IDs.");
  }
};

const fetchHotels = async (cityCode, checkInDate, checkOutDate) => {
  try {
    const accessToken = await getAmadeusAccessToken();

    const hotelIds = await getHotelIds(accessToken, cityCode);

    const hotelIdsQuery = hotelIds.join(",");

    console.log("🚀 Making request to Amadeus API with:", {
      hotelIds: hotelIdsQuery,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    });

    const response = await axios.get("https://test.api.amadeus.com/v3/shopping/hotel-offers", {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        hotelIds: hotelIdsQuery,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        adults: 1, // ✅ Required
        roomQuantity: 1, // ✅ Required
        currency: "USD", // ✅ Recommended
        paymentPolicy: "NONE", // ✅ Test mode requires this sometimes
        bestRateOnly: true, // ✅ Filter for test responses
      },
    });

    console.log("✅ API Response:", response.data);

    return response.data.data;
  } catch (error) {
    console.error("🔴 ERROR: Fetching Hotels Failed:", error.response?.data || error.message);
    throw new Error("Failed to fetch hotel options. " + (error.response?.data?.errors?.[0]?.detail || ""));
  }
};

module.exports = { fetchHotels };
