let cityName = 'London';
const URLApi = `https://api.weatherapi.com/v1/forecast.json?key=19f4e2729c45485f99c12545232203&q=${cityName}&days=5&aqi=no&alerts=no`;

// Selectors
const city = document.querySelector('.city');
const region = document.querySelector('.region');
const country = document.querySelector('.country');
const logo = document.querySelector('.logo');
const condition = document.querySelector('.condition');
const celcius = document.querySelector('.celcius');
const farenheit = document.querySelector('.farenheit');
// const time = document.querySelector('.time');
// const date = document.querySelector('.date');

async function getData(api) {
    try {
        const forecastResponse = await fetch(api, { mode: 'cors' });
        const forecastWeatherData = await forecastResponse.json();
        city.innerHTML = forecastWeatherData.location.name;
        region.innerHTML = forecastWeatherData.location.region;
        country.innerHTML = forecastWeatherData.location.country;
        logo.src = forecastWeatherData.current.condition.icon;
        condition.innerHTML = forecastWeatherData.current.condition.text;
        celcius.innerHTML = `${forecastWeatherData.current['temp_c']}°C `;
        farenheit.innerHTML = `${forecastWeatherData.current['temp_f']}°F`;
        setBg(forecastWeatherData.current['is_day']);
        addForecast(forecastWeatherData.forecast);
        addHourlyForecast(
            forecastWeatherData.forecast.forecastday[0].hour,
            forecastWeatherData.current['last_updated_epoch']
        );
    } catch (error) {
        console.log(error);
    }
}

getData(URLApi);

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

// Add forecast
function addForecast(forecast) {
    let forecastDiv = document.querySelector('.forecast');
    let dailyForecast = document.createElement('div');
    let title = document.createElement('h2');
    title.textContent = '5 Day Forecast';
    forecastDiv.appendChild(title);
    dailyForecast.classList.add('daily-forecast');
    forecast.forecastday.forEach((day) => {
        let daily = document.createElement('div');
        daily.classList.add('daily');
        let date = document.createElement('p');
        date.classList.add('forecast-date');
        date.textContent = day.date;
        let img = document.createElement('img');
        img.classList.add('logo');
        img.src = day.day.condition.icon;
        let p = document.createElement('p');
        p.classList.add('condition');
        p.textContent = day.day.condition.text;
        let temps = document.createElement('div');
        temps.classList.add('temps');
        let celcius = document.createElement('span');
        celcius.classList.add('celcius-min');
        celcius.textContent = `${day.day['mintemp_c']} `;
        let celciusMax = document.createElement('span');
        celciusMax.classList.add('celcius-max');
        celciusMax.textContent = `${day.day['maxtemp_c']}°C / `;
        let farenheit = document.createElement('span');
        farenheit.classList.add('farenheit-min');
        farenheit.textContent = `${day.day['mintemp_f']} `;
        let farenheitMax = document.createElement('span');
        farenheitMax.classList.add('farenheit-max');
        farenheitMax.textContent = `${day.day['maxtemp_f']}°F`;

        temps.appendChild(celcius);
        temps.appendChild(celciusMax);
        temps.appendChild(farenheit);
        temps.appendChild(farenheitMax);

        daily.appendChild(date);
        daily.appendChild(img);
        daily.appendChild(p);
        daily.appendChild(temps);
        dailyForecast.appendChild(daily);
    });
    forecastDiv.appendChild(dailyForecast);
}

// Add Hourly forecast
function addHourlyForecast(forecast, lastEpochTime) {
    let forecastDiv = document.querySelector('.forecast');
    let hourlyForecast = document.createElement('div');
    let title = document.createElement('h2');
    title.textContent = '5 Hour Forecast';
    forecastDiv.appendChild(title);
    hourlyForecast.classList.add('hourly-forecast');

    let nextFiveHrs = [];
    forecast.forEach((time) => {
        if (time['time_epoch'] > lastEpochTime && nextFiveHrs.length < 5) {
            nextFiveHrs.push(time);
        }
    });

    nextFiveHrs.forEach((hours) => {
        let hourly = document.createElement('div');
        hourly.classList.add('hourly');
        let hour = document.createElement('p');
        hour.classList.add('forecast-date');
        hour.textContent = hours.time.slice(-5);
        let img = document.createElement('img');
        img.classList.add('logo');
        img.src = hours.condition.icon;
        let p = document.createElement('p');
        p.classList.add('condition');
        p.textContent = hours.condition.text;
        let temps = document.createElement('div');
        temps.classList.add('temps');
        let celcius = document.createElement('span');
        // celcius.classList.add('celcius-min');
        // // celcius.textContent = `${day.day['mintemp_c']} `;
        let celciusMax = document.createElement('span');
        celciusMax.classList.add('celcius-max');
        celciusMax.textContent = `${hours['temp_c']}°C / `;
        let farenheit = document.createElement('span');
        // farenheit.classList.add('farenheit-min');
        // // farenheit.textContent = `${day.day['mintemp_f']} `;
        let farenheitMax = document.createElement('span');
        farenheitMax.classList.add('farenheit-max');
        farenheitMax.textContent = `${hours['temp_f']}°F`;

        temps.appendChild(celcius);
        temps.appendChild(celciusMax);
        temps.appendChild(farenheit);
        temps.appendChild(farenheitMax);

        hourly.appendChild(hour);
        hourly.appendChild(img);
        hourly.appendChild(p);
        hourly.appendChild(temps);
        hourlyForecast.appendChild(hourly);
    });
    forecastDiv.appendChild(hourlyForecast);
}

// Add functionality to input and search button
let searchInput = document.querySelector('input');
let searchButton = document.querySelector('button');

searchButton.addEventListener('click', () => {
    // Remove current data
    const myNode = document.querySelector('.forecast');
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }
    // Remove current data end
    let URLApi = `http://api.weatherapi.com/v1/forecast.json?key=19f4e2729c45485f99c12545232203&q=${searchInput.value}&days=5&aqi=no&alerts=no`;
    getData(URLApi);
});

// Search on enter
searchInput.addEventListener('keypress', function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === 'Enter') {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        searchButton.click();
    }
});
