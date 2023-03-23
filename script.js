const current =
    'http://api.weatherapi.com/v1/current.json?key=19f4e2729c45485f99c12545232203&q=London&aqi=no';
const forecast =
    'http://api.weatherapi.com/v1/forecast.json?key=19f4e2729c45485f99c12545232203&q=London&aqi=no';

async function getData() {
    try {
        const currentResponse = await fetch(current, { mode: 'cors' });
        const currentWeatherData = await currentResponse.json();
        const forecastResponse = await fetch(forecast, { mode: 'cors' });
        const forecastWeatherData = await forecastResponse.json();
        return Promise.all([currentWeatherData, forecastWeatherData]);
    } catch (error) {
        console.log(error);
    }
}

const data = getData();
console.log(data);
