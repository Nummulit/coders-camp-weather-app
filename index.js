// Fake API data for testing
let currentWeather = {
  cityName: 'Berlin',
  temperature: 286.67,
  windSpeed: 1.81,
  description: 'clear sky',
  icon: '01d'
}

const fiveDaysForecast = [
  {
    date: '2017-02-16 12:00:00',
    temperature: 286.67,
    windSpeed: 1.81,
    icon: '01d',
    description: 'broken clouds'
  },{
    date: '2017-02-16 15:00:00',
    temperature: 286.67,
    windSpeed: 1.81,
    icon: '02d',
    description: 'clear sky'
  },{
    date: '2017-02-16 18:00:00',
    temperature: 286.67,
    windSpeed: 1.81,
    icon: '03d',
    description: 'broken clouds'
  },{
    date: '2017-02-16 21:00:00',
    temperature: 286.67,
    windSpeed: 1.81,
    icon: '10d',
    description: 'broken clouds'
  },{
    date: '2017-02-16 00:00:00',
    temperature: 286.67,
    windSpeed: 1.81,
    icon: '11d',
    description: 'broken clouds'
  },{
    date: '2017-02-16 03:00:00',
    temperature: 286.67,
    windSpeed: 1.81,
    icon: '13d',
    description: 'broken clouds'
  }
];

// Global variables
const currentWeatherTemplate = document.querySelector('#current-weather');
const currentWeatherContainer = document.querySelector('.today');

const threeHoursWeatherTemplate = document.querySelector('#three-hours-weather');
const threeHoursWeatherContainer = document.querySelector('.today-hours');

const weatherForFewDaysTemplate = document.querySelector('#weather-for-the-day');
const weatherForFewDaysContainer = document.querySelector('.few-days');

// First letter to uppercase function
function jsUcfirst(string) 
{
  return string.charAt(0).toUpperCase() + string.slice(1);
}



// Clone template from html, generate current weather and wind to html
function currentWeatherToHtml(forecast) {
  const currentWeatherHtml = document.importNode(currentWeatherTemplate.content, true);
  currentWeatherHtml.querySelector('.city').textContent = forecast.cityName;
  currentWeatherHtml.querySelector('.temp').textContent = Math.floor(forecast.temperature - 273.15) + ' °C';
  currentWeatherHtml.querySelector('.state-weather').textContent = jsUcfirst(forecast.description);
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
      'pl',{weekday: 'short'})) + ' ' + forecastDate.toLocaleTimeString('pl',{minute: '2-digit', hour: '2-digit'});
  threeHoursWeatherHtml.querySelector('.icon').src = `//openweathermap.org/img/wn/${forecast.icon}@2x.png`;
  threeHoursWeatherHtml.querySelector('.temp').textContent = Math.floor(forecast.temperature - 273.15) + ' °C';

  return threeHoursWeatherHtml;
}
// Map method on forecasts
function forecastsToHtml(forecasts) {
  return forecasts.map(forecast => forecastToHtml(forecast));
}
// Function call on first six elements and append all forecasts to container
threeHoursWeatherContainer.append(...forecastsToHtml(fiveDaysForecast.slice(0, 6)));



// Cloning template from html and generate weather 1 day forecast to html
function weatherForFewDaysToHtml(forecast) {
    const weatherForFewDaysHtml = document.importNode(weatherForFewDaysTemplate.content, true);
    const day = new Date(forecast.date);
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    weatherForFewDaysHtml.querySelector('.day').innerHTML = days[day.getDay()];
    weatherForFewDaysHtml.querySelector('.day-icon').src = `//openweathermap.org/img/wn/${forecast.icon}@2x.png`;
    weatherForFewDaysHtml.querySelector('.day-desc').textContent = forecast.description;
    weatherForFewDaysHtml.querySelector('.day-temp').textContent = Math.floor(forecast.temperature - 273.15) + ' °C';
    
    return weatherForFewDaysHtml;
}
// Map method on forecasts
function weathersForFewDaysToHtml(forecasts) {
  return forecasts.map(forecast => weatherForFewDaysToHtml(forecast));
}
// Function call and apend all days to container
weatherForFewDaysContainer.append(...weathersForFewDaysToHtml(fiveDaysForecast));