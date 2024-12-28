import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function InfoBox({ info }) {
    const INIT_url = "https://images.unsplash.com/photo-1706122838691-3679d575c60e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c25vdyUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D";
    
    return (
        <div className="InfoBox">
            <h1>Weather info</h1>
            <div className='cardContainer'>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={INIT_url}
                        title="Snow Weather"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {info.city}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"}>
                            <p>Temperature = {info.temp}&deg;C</p>
                            <p>Humidity = {info.humidity}</p>
                            <p>Min Temperature = {info.tempMin}</p>
                            <p>Max Temperature = {info.tempMax}</p>
                            <p>
                                The Weather can be described as <i>{info.weather}</i> and Feels Like {info.feelslike}
                            </p>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
