import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);

    const WEATHER_API_URL = import.meta.env.VITE_WEATHER_API_URL;
    const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const UNSPLASH_API_URL = import.meta.env.VITE_UNSPLASH_API_URL;
    const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

    let getWeatherInfo = async () => {
        try {
            // Fetch weather data
            let weatherResponse = await fetch(`${WEATHER_API_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
            let weatherJson = await weatherResponse.json();

            if (weatherJson.cod !== 200) {
                throw new Error(weatherJson.message);
            }

            // Fetch city image
            let imageResponse = await fetch(`${UNSPLASH_API_URL}?query=${city}&client_id=${UNSPLASH_ACCESS_KEY}`);
            let imageJson = await imageResponse.json();

            let result = {
                city: weatherJson.name,
                temp: weatherJson.main.temp,
                tempMin: weatherJson.main.temp_min,
                tempMax: weatherJson.main.temp_max,
                humidity: weatherJson.main.humidity,
                feelsLike: weatherJson.main.feels_like,
                weather: weatherJson.weather[0].description,
                cityImage: imageJson.results[0]?.urls?.small || ""
            };
            return result;
        } catch (err) {
            throw err;
        }
    };

    let handleChange = (evt) => {
        setCity(evt.target.value);
    };

    let handleSubmit = async (evt) => {
        try {
            evt.preventDefault();
            setError(false); // Reset error state
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            setCity("");
        } catch (err) {
            console.error(err);
            setError(true);
        }
    };

    return (
        <div className="SearchBox">
            <form onSubmit={handleSubmit}>
                <TextField
                    id="city"
                    label="City Name"
                    variant="outlined"
                    required
                    value={city}
                    onChange={handleChange}
                />
                <br /><br />
                <Button variant="contained" type="submit">
                    Search
                </Button>
                {error && <p style={{ color: 'red' }}>No Such Place Exists or API Error!</p>}
            </form>
        </div>
    );
}
