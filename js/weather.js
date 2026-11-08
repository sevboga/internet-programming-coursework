// athens forecast
const weather_url = "https://api.open-meteo.com/v1/forecast?latitude=37.98&longitude=23.73&current=temperature_2m,weather_code&daily=precipitation_probability_max&timezone=auto&forecast_days=1";

const weather_icon = document.querySelector("#weather_icon");
const weather_temp = document.querySelector("#weather_temp");
const weather_desc = document.querySelector("#weather_desc");
const weather_rain = document.querySelector("#weather_rain");
const weather_tip = document.querySelector("#weather_tip");

//retrieve weather from open meteo
fetch(weather_url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch weather info");
        }
        return response.json();
    })
    .then(data => {
        const temp = Math.round(data.current.temperature_2m);
        const code = data.current.weather_code;
        const rain = data.daily.precipitation_probability_max[0];

    //weather description
    if (code === 0) {
        weather_desc.textContent = "Clear";
        weather_icon.className = "bi bi-sun-fill display-3 text-gold";
    }
    else if (code <= 3) {
        weather_desc.textContent = "Cloudy";
        weather_icon.className = "bi bi-cloud-fill display-3 text-gold";
    }
    else {
        weather_desc.textContent = "other weather condition";
        weather_icon.className = "bi bi-cloud-rain-fill display-3 text-gold";
    }
    //temperature and rain chance
    weather_temp.textContent = temp + "°C";
    weather_rain.textContent = rain + "%";
    //coffee recommendation
        if (rain >= 50) {
            weather_tip.textContent = "Rainy? Try a hot chocolate!";
        }
        else if (temp >= 28) {
            weather_tip.textContent = "Hot day? Enjoy a freddo espresso!";
        }
        else if (temp <= 12) {
            weather_tip.textContent = "Cold day? Warm up with a coffee!";
        }
        else {
            weather_tip.textContent = "Perfect weather for a coffee!";
        }
    })
    .catch(error => {
        weather_desc.textContent = "Weather Unavailable";
        console.log(error);
    });
