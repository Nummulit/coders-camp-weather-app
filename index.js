const userName = 'edud';

// Field for searching the cities
const citySearchField = document.querySelector('.form-control');
// <ul> for displaying the results
const searchResults = document.querySelector('.suggestions');
// Submit Button
const submitBtn = document.querySelector('.button');

// Currently selected city
let currentCity = {
    name: '',
    country: '',
    lat: 0,
    lon: 0,
    timezone: 0
};

// Looks for all cities in geonames.org starting with specified `text`.
// Returns a Promise.
async function findCities(text) {
    const url = `http://api.geonames.org/searchJSON?
      username=${userName}&
      maxRows=10&
      style=full&
      country=pl&
      name_startsWith=${text}&
      orderby=population`.replace(/\s/g, ''); // Removes any whitespace
    const response = await fetch(url);
    const data = await response.json();
    const cities = await data.geonames.map(el => {
        return {
            name: el.name,
            countryCode: el.countryCode,
            lat: parseFloat(el.lat),
            lon: parseFloat(el.lng),
            timezone: parseFloat(el.timezone.gmtOffset)
        }
    });
    return cities;
}


// Calls findCities with provided text and appends the results to the provided listNode.
async function displayCities(listNode, text, searchField) {
    let cities = await findCities(text);
    for (city of cities) {
        let li = document.createElement('li');
        li.innerHTML = `
<span class="city-name">${city.name}</span>
 <span class="country-code">${city.countryCode}</span>
 <span class="lat">${city.lat}</span>
 <span class="lon">${city.lon}</span>
 <span class="timezone">${city.timezone}</span>
    `;
        li.addEventListener('click', (event) => {
            searchField.value = li.textContent;
        });
        listNode.appendChild(li);
    }
}

// Clears the content of specified listNode.
function clearCities(listNode) {
    listNode.innerHTML = '';
}

// Listening for input.
citySearchField.addEventListener('input', event => {
    clearCities(searchResults);
    displayCities(searchResults, event.target.value, citySearchField);
});

// Listening for submit.
submitBtn.addEventListener('click', event => {
    currentCityStr = citySearchField.value;

    // Extract values from the city string.
    currentCity.name = currentCityStr.split(" ")[0];
    currentCity.contry = currentCityStr.split(" ")[1];
    currentCity.lat = parseFloat(currentCityStr.split(" ")[2]);
    currentCity.lon = parseFloat(currentCityStr.split(" ")[3]);
    currentCity.timezone = parseInt(currentCityStr.split(" ")[4]);

    // Here we can call the weather API and reload the data.

    fiveDayThreeHourForecastData(currentCity.lat, currentCity.lon)
});


// Hide the suggestions box after pressing the Escape key.
document.body.addEventListener('keyup', (event) => {
    if (event.code === "Escape") clearCities(searchResults);
});

// Hide the suggestions box after pressing anywhere outside the suggestions box.
document.body.addEventListener('click', (event) => {
    if (!searchResults.contains(event.target)) {
        clearCities(searchResults);
    }
});

let fiveDaysForecast = [];
const currentWeather = {
    cityName: "",
    temperature: "",
    windSpeed: "",
    description: "",
    icon: "",
    currentTimeInCity: ""
};
const weatherEvery3Hours = [];
const corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/";

function fiveDayThreeHourForecastData(lat, lon) {
    const apiUrl = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=e9c5c4f3beac305dd98167aca8dcc85b`;
    const url = corsAnywhereUrl + apiUrl;

    fetch(url)
        .then(resp => resp.json())
        .then(async function (resp) {
            currentWeather.cityName = resp.city.name;
            currentWeather.temperature = Math.floor(resp.list[0].main.temp);
            currentWeather.windSpeed = resp.list[0].wind.speed;
            currentWeather.icon = resp.list[0].weather[0].icon;
            currentWeather.description = resp.list[0].weather[0].description;

            for (let i = 0; i <= 5; i++) {
                weatherEvery3Hours.push({
                    date: resp.list[i].dt_txt,
                    temperature: Math.floor(resp.list[i].main.temp),
                    windSpeed: resp.list[i].wind.speed,
                    description: resp.list[i].weather[0].description,
                    icon: resp.list[i].weather[0].icon
                });
            }

            const date = new Date();
            date.getTime();
            date.setUTCSeconds(resp.city.timezone);
            currentWeather.currentTimeInCity = date.toUTCString();

            fiveDaysForecast = [];
            resp.list.forEach(weather => {
                if (weather.dt_txt[11] == 1 && weather.dt_txt[12] == 2) {
                    fiveDaysForecast.push({
                        date: weather.dt_txt,
                        temperature: Math.floor(weather.main.temp),
                        description: weather.weather[0].description,
                        icon: weather.weather[0].icon
                    });
                }
            });

            await create();
        })
        .catch(error => {
            console.log(`błąd: ${error}`);
            window.alert("Error, please try again later");
        });
}

const currentWeatherTemplate = document.querySelector('#current-weather');
const currentWeatherContainer = document.querySelector('.today');

const threeHoursWeatherTemplate = document.querySelector('#three-hours-weather');
const threeHoursWeatherContainer = document.querySelector('.today-hours');

const weatherForFewDaysTemplate = document.querySelector('#weather-for-the-day');
const weatherForFewDaysContainer = document.querySelector('.few-days');

function create() {
    // First letter to uppercase function
    function jsUcfirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }



    // Clone template from html, generate current weather and wind to html
    function currentWeatherToHtml(forecast) {
        const currentWeatherHtml = document.importNode(currentWeatherTemplate.content, true);
        currentWeatherHtml.querySelector('.city').textContent = forecast.cityName;
        currentWeatherHtml.querySelector('.temp').textContent = Math.floor(forecast.temperature) + ' °C';
        currentWeatherHtml.querySelector('.state-weather').textContent = jsUcfirst(forecast.description);
        const forecastDate = new Date(forecast.currentTimeInCity);
        currentWeatherHtml.querySelector('.time').textContent = forecastDate.toLocaleTimeString();
        currentWeatherHtml.querySelector('.wind-speed').textContent = `${forecast.windSpeed} m/s`;

        return currentWeatherHtml;
    }
    // Append current weather to container
    currentWeatherContainer.appendChild(currentWeatherToHtml(currentWeather));



    // Clone template from html, generate weather every three hour to html 
    function forecastToHtml(forecast) {
        const threeHoursWeatherHtml = document.importNode(threeHoursWeatherTemplate.content, true);
        const forecastDate = new Date(forecast.date);
        threeHoursWeatherHtml.querySelector('.hour').textContent = jsUcfirst(forecastDate.toLocaleDateString(
            'pl', {
                weekday: 'short'
            })) + ' ' + forecastDate.toLocaleTimeString('pl', {
            minute: '2-digit',
            hour: '2-digit'
        });
        threeHoursWeatherHtml.querySelector('.icon').src = `//openweathermap.org/img/wn/${forecast.icon}@2x.png`;
        threeHoursWeatherHtml.querySelector('.temp').textContent = Math.floor(forecast.temperature) + ' °C';
        threeHoursWeatherHtml.querySelector('.wind-forecast').textContent = `${forecast.windSpeed} m/s`;

        return threeHoursWeatherHtml;
    }
    // Map method on forecasts
    function forecastsToHtml(forecasts) {
        return forecasts.map(forecast => forecastToHtml(forecast));
    }
    // Function call on first six elements and append all forecasts to container
    threeHoursWeatherContainer.append(...forecastsToHtml(weatherEvery3Hours.slice(0, 6)));



    // Cloning template from html and generate weather for 1 day forecast to html
    function weatherForFewDaysToHtml(forecast) {
        const weatherForFewDaysHtml = document.importNode(weatherForFewDaysTemplate.content, true);
        const day = new Date(forecast.date);
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        weatherForFewDaysHtml.querySelector('.day').innerHTML = days[day.getDay()];
        weatherForFewDaysHtml.querySelector('.day-icon').src = `//openweathermap.org/img/wn/${forecast.icon}@2x.png`;
        weatherForFewDaysHtml.querySelector('.day-desc').textContent = forecast.description;
        weatherForFewDaysHtml.querySelector('.day-temp').textContent = Math.floor(forecast.temperature) + ' °C';

        return weatherForFewDaysHtml;
    }
    // Map method on forecasts
    function weathersForFewDaysToHtml(forecasts) {
        return forecasts.map(forecast => weatherForFewDaysToHtml(forecast));
    }
    // Function call and apend all days to container
    weatherForFewDaysContainer.append(...weathersForFewDaysToHtml(fiveDaysForecast));

}