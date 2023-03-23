const forecast =
    'http://api.weatherapi.com/v1/forecast.json?key=19f4e2729c45485f99c12545232203&q=London&days=5&aqi=no&alerts=no';

// Selectors
const city = document.querySelector('.city');
const region = document.querySelector('.region');
const country = document.querySelector('.country');
const logo = document.querySelector('.logo');
const condition = document.querySelector('.condition');
const celcius = document.querySelector('.celcius');
const farenheit = document.querySelector('.farenheit');
const time = document.querySelector('.time');
const date = document.querySelector('.date');

async function getData() {
    try {
        const forecastResponse = await fetch(forecast, { mode: 'cors' });
        const forecastWeatherData = await forecastResponse.json();
        console.log(forecastWeatherData);
        city.innerHTML = forecastWeatherData.location.name;
        region.innerHTML = forecastWeatherData.location.region;
        country.innerHTML = forecastWeatherData.location.country;
        logo.src = forecastWeatherData.current.condition.icon;
        condition.innerHTML = forecastWeatherData.current.condition.text;
        celcius.innerHTML = `${forecastWeatherData.current['temp_c']}°C `;
        farenheit.innerHTML = `${forecastWeatherData.current['temp_f']}°F`;
    } catch (error) {
        console.log(error);
    }
}

getData();

//Display real-time
const interval = setInterval(() => {
    let currentTime = new Date().toTimeString().slice(0, 8);
    time.innerHTML = currentTime;
}, 1000);

// Display date
var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};
var today = new Date();
date.innerHTML = today.toLocaleDateString('en-US', options); // Saturday, September 17, 2016
