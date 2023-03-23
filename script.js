const current =
    'http://api.weatherapi.com/v1/current.json?key=19f4e2729c45485f99c12545232203&q=London&aqi=no';
const forecast =
    'http://api.weatherapi.com/v1/forecast.json?key=19f4e2729c45485f99c12545232203&q=London&aqi=no';

// Selectors

const city = document.querySelector('.city');
const region = document.querySelector('.region');
const country = document.querySelector('.country');
const logo = document.querySelector('.logo');
const condition = document.querySelector('.condition');
const celcius = document.querySelector('.celcius');
const farenheit = document.querySelector('.farenheit');

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
        celcius.innerHTML = `${forecastWeatherData.current['temp_c']}°C`;
        farenheit.innerHTML = `${forecastWeatherData.current['temp_f']}°F`;
    } catch (error) {
        console.log(error);
    }
}

getData();
