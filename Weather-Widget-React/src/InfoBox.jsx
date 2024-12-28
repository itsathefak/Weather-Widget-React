import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function InfoBox(){
    const INIT_url = "https://images.unsplash.com/photo-1706122838691-3679d575c60e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c25vdyUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D";
    let Info={
        city : "Toronto",
        feelslike: 24.84,
        temp:25.05,
        tempMin: 25.05,
        tempMax : 25.05,
        humidity : 47,
        weather : "haze"
    }
    return(
        <div className="InfoBox">
            <h1>Weather info</h1>
            <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image= {INIT_url}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {Info.city}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"}>
            <p>Temperature = {Info.temp}&deg;C</p>
            <p>Humidity = {Info.humidity}</p>
            <p>Min Temperature = {Info.tempMin}</p>
            <p>Max Temperature = {Info.humidity}</p>
            <p>The Weather can be described as <i> {Info.weather} </i> and Feels Like {Info.feelslike}</p>

        </Typography>
      </CardContent>

    </Card>
        </div>
    )
}