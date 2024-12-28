import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function SearchBox({ updateInfo }) {
  const [city, setCity] = useState('');
  const [error, setError] = useState(false);

  const WEATHER_API_URL = import.meta.env.VITE_WEATHER_API_URL;
  const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const UNSPLASH_API_URL = import.meta.env.VITE_UNSPLASH_API_URL;
  const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  const getWeatherInfo = async () => {
    try {
      const weatherResponse = await fetch(
        `${WEATHER_API_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const weatherJson = await weatherResponse.json();

      if (weatherJson.cod !== 200) {
        throw new Error(weatherJson.message);
      }

      const imageResponse = await fetch(
        `${UNSPLASH_API_URL}?query=${city}&client_id=${UNSPLASH_ACCESS_KEY}`
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
      return result;
    } catch (err) {
      throw err;
    }
  };

  const handleChange = (evt) => {
    setCity(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      setError(false);
      const newInfo = await getWeatherInfo();
      updateInfo(newInfo);
      setCity('');
    } catch (err) {
      setError(true);
    }
  };

  return (
    <Box sx={{ padding: '1rem', width: '100%', maxWidth: 600 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              id="city"
              label="Enter City Name"
              variant="outlined"
              required
              value={city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" type="submit" fullWidth>
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>Error: Invalid City</p>}
    </Box>
  );
}
