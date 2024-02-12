import axios from "axios";

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const { originraw, destinationraw, worker } = body;
    const [origin, destination] = await getAddressJson(
      originraw,
      destinationraw
    );

    const ngrokLink = `https://500e-66-244-231-114.ngrok-free.app/execute-script-${worker}`;

    const response = await axios.post(ngrokLink, {
      origin: origin,
      destination: destination,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data.result),
    };
  } catch (error) {
    console.error("Error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};

const addressToGeocodingAPI = (address) => {
  const encodedAddress = encodeURIComponent(address);
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  return apiUrl;
};

async function getAddressJson(originAddr, destinationAddr) {
  let origin = {};
  let destination = {};
  let originAddress1 = null;

  const result = await reverseGeocode(
    originAddr.latitude,
    originAddr.longitude
  );

  let destinationGeocode;
  const geocodingApiUrl = addressToGeocodingAPI(destinationAddr);

  try {
    destinationGeocode = await axios.get(geocodingApiUrl);
  } catch (error) {}

  origin = {
    addressLine1: result,
    source: "SEARCH",
    latitude: originAddr.latitude,
    longitude: originAddr.longitude,
    provider: "uber_places",
  };

  destination = {
    addressLine1: destinationAddr,
    source: "SEARCH",
    latitude: destinationGeocode?.data.results[0].geometry.location.lat,
    longitude: destinationGeocode?.data.results[0].geometry.location.lng,
    provider: "uber_places",
  };

  return [origin, destination];
}

async function reverseGeocode(latitude, longitude) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );

    if (response) {
      const firstResult = response.data.results[0];
      const formattedAddress = firstResult.formatted_address;
      return formattedAddress;
    } else {
      console.error("Geocoding request failed");
    }

    return null;
  } catch (error) {
    console.error("Error during reverse geocoding:", error);
    return null;
  }
}
