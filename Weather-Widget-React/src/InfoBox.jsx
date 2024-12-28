import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function InfoBox({ info }) {
  const INIT_url =
    'https://images.unsplash.com/photo-1706122838691-3679d575c60e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c25vdyUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D';

  return (
    <Box sx={{ width: '100%', maxWidth: 800, marginTop: '2rem' }}>
      <h1>Weather Information</h1>
      <Box className="cardContainer" sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia sx={{ height: 200 }} image={info.cityImage || INIT_url} title={info.weather || 'Weather Image'} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {info.city || 'Unknown City'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <p>Temperature = {info.temp}&deg;C</p>
              <p>Humidity = {info.humidity}%</p>
              <p>Min Temperature = {info.tempMin}&deg;C</p>
              <p>Max Temperature = {info.tempMax}&deg;C</p>
              <p>
                The weather is <i>{info.weather}</i>, and feels like {info.feelsLike}&deg;C.
              </p>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
