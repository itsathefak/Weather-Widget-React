import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";

export default function WeatherApp() {
    let [weatherInfo, setWeatherInfo] = useState({
        city: "Toronto",
        feelslike: 24.84,
        temp: 25.05,
        tempMin: 25.05,
        tempMax: 25.05,
        humidity: 47,
        weather: "haze"
    });

    let updateInfo = (result)=>{
        setWeatherInfo(result)
    }

    return (
        <div>
            <h2>Weather Now</h2>
            <SearchBox updateInfo = {updateInfo}/>
            <InfoBox info={weatherInfo} />
        </div>
    );
}
