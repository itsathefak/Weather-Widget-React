import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "Toronto",
    feelslike: 24.84,
    temp: 25.05,
    tempMin: 25.05,
    tempMax: 25.05,
    humidity: 47,
    weather: "haze",
    cityImage: "",
  });

  const [loading, setLoading] = useState(true); // Loading state for location fetch
  const [error, setError] = useState(false); // State to handle errors
  const [locationError, setLocationError] = useState(false); // State for location denial error

  // Function to fetch weather data based on location
  const getWeatherByLocation = async (lat, lon) => {
    const WEATHER_API_URL = import.meta.env.VITE_WEATHER_API_URL;
    const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const UNSPLASH_API_URL = import.meta.env.VITE_UNSPLASH_API_URL;
    const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

    try {
      const weatherResponse = await fetch(
        `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const weatherJson = await weatherResponse.json();

      if (weatherJson.cod !== 200) {
        throw new Error(weatherJson.message);
      }

      const imageResponse = await fetch(
        `${UNSPLASH_API_URL}?query=${weatherJson.name}&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      const imageJson = await imageResponse.json();

      const result = {
        city: weatherJson.name,
        temp: weatherJson.main.temp,
        tempMin: weatherJson.main.temp_min,
        tempMax: weatherJson.main.temp_max,
        humidity: weatherJson.main.humidity,
        feelsLike: weatherJson.main.feels_like,
        weather: weatherJson.weather[0].description,
        cityImage: imageJson.results[0]?.urls?.small || '',
      };

      setWeatherInfo(result);
      setLoading(false); // Stop loading after the weather is fetched
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setLoading(false);
      setError(true);
    }
  };

  // Function to get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          getWeatherByLocation(lat, lon); // Fetch weather data using lat and lon
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
          if (error.code === error.PERMISSION_DENIED) {
            setLocationError(true); // Set location error if the user denies permission
          } else {
            setError(true); // Handle other errors
          }
        }
      );
    } else {
      console.error("Geolocation not supported by this browser.");
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    getCurrentLocation(); // Call the function to get the user's current location on component mount
  }, []);

  let updateInfo = (result) => {
    setWeatherInfo(result);
  };

  return (
    <div>
      <h2>Weather Now</h2>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <CircularProgress /> {/* Displaying the loading spinner */}
        </div>
      ) : locationError ? (
        <p style={{ color: "red", textAlign: "center" }}>
          Please refresh the page and allow location access to get the weather information.
        </p> // Error message when the user denies location access
      ) : error ? (
        <p style={{ color: "red", textAlign: "center" }}>
          Error fetching weather data. Please try again later.
        </p> // Display error message if location or weather fetch fails
      ) : (
        <>
          <SearchBox updateInfo={updateInfo} />
          <InfoBox info={weatherInfo} />
        </>
      )}
    </div>
  );
}
