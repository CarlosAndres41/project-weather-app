const forecast =
    'http://api.weatherapi.com/v1/forecast.json?key=19f4e2729c45485f99c12545232203&q=london&days=5&aqi=no&alerts=no';

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
        setBg(forecastWeatherData.current['is_day']);
    } catch (error) {
        console.log(error);
    }
}

getData();

// Local time and date
//Display real-time
const interval = setInterval(() => {
    let currentTime = new Date().toTimeString().slice(0, 5);
    time.innerHTML = currentTime;
}, 1000);

// Display date
var options = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};
var today = new Date();
date.innerHTML = today.toLocaleDateString('en-US', options); // Saturday, September 17, 2016

// Set backgrund image according to day or night time
function setBg(status) {
    // if day
    if (status === 1) {
        document.body.style.backgroundImage = 'url(day.svg)';
        document.body.style.color = '#002b5b';
    } else {
        document.body.style.backgroundImage = 'url(night.svg)';
        document.body.style.color = '#C7E8CA';
        let header = document.querySelector('.header');
        header.style.color = '#001220';
    }
}
