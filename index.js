// Fake API data for testing
let cityName = "Berlin",
  currentTemp = 286.67,
  currentWindSpeed = 1.81,
  currentWeatherDescription = "clear sky",
  currentWeatherIcon = "01d";

const fiveDaysForecast = [
  {
    date: '2017-02-16 12:00:00',
    temperatura: 286.67,
    windSpeed: 1.81,
    icon: '01d',
    description: 'broken clouds'
  },{
    date: '2017-02-16 15:00:00',
    temperatura: 286.67,
    windSpeed: 1.81,
    icon: '02d',
    description: 'clear sky'
  },{
    date: '2017-02-16 18:00:00',
    temperatura: 286.67,
    windSpeed: 1.81,
    icon: '03d',
    description: 'broken clouds'
  },{
    date: '2017-02-16 21:00:00',
    temperatura: 286.67,
    windSpeed: 1.81,
    icon: '10d',
    description: 'broken clouds'
  },{
    date: '2017-02-16 24:00:00',
    temperatura: 286.67,
    windSpeed: 1.81,
    icon: '11d',
    description: 'broken clouds'
  },{
    date: '2017-02-16 03:00:00',
    temperatura: 286.67,
    windSpeed: 1.81,
    icon: '13d',
    description: 'broken clouds'
  }
];

// Global variables
const currentWeatherTemplate = document.querySelector('#current-weather');
const currenWeatherContainer = document.querySelector('.today');

const threeHoursWeatherTemplate = document.querySelector('#three-hour-weather');
const threeHoursWeatherContainer = document.querySelector('.toDayHoures');

const weatherForFewDaysTemplate = document.querySelector('#weather-for-the-day');
const weatherForFewDaysContainer = document.querySelector('.few-days');



// First letter to uppercase function
function jsUcfirst(string) 
{
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Clone template from html, generate current weather html and append it to
// current weather container in html
function currentWeatherWrapper(cityName, currentTemp, currentWeatherDescription) {
  const currentWeatherHtml = document.importNode(currentWeatherTemplate.content, true);
  currentWeatherHtml.querySelector('.city').textContent = cityName;
  currentWeatherHtml.querySelector('.temp').textContent = currentTemp;
  currentWeatherHtml.querySelector('.state-weather').textContent = jsUcfirst(currentWeatherDescription);

  currenWeatherContainer.appendChild(currentWeatherHtml);
}
currentWeatherWrapper(cityName, currentTemp, currentWeatherDescription);



// Clone template from html, generate weather every three hours html and append it to
// weather every three hours container in html
function threeHoursWeatherWrapper(fiveDaysForecast) {
  for (let i = 0; i <= 5; i++){
    const threeHoursWeatherHtml = document.importNode(threeHoursWeatherTemplate.content, true);
    // TODO: Pomocnicza funkcja ktora wyciaga tylko godzine z daty!
    threeHoursWeatherHtml.querySelector('.hour').textContent = fiveDaysForecast[i].date;
    threeHoursWeatherHtml.querySelector('.sizeIcon').src = `http://openweathermap.org/img/wn/${fiveDaysForecast[i].icon}@2x.png`;
    threeHoursWeatherHtml.querySelector('.temp').textContent = fiveDaysForecast[i].temperatura;

    threeHoursWeatherContainer.appendChild(threeHoursWeatherHtml);
  }
}
threeHoursWeatherWrapper(fiveDaysForecast);



// Clone template from html, generate weather for the few days html and append it to
// weather for the few days container in html
function weatherForFewDaysWrapper(fiveDaysForecast) {
  for (let i = 0; i <= 3; i++){
    const weatherForFewDaysHtml = document.importNode(weatherForFewDaysTemplate.content, true);
    // TODO: Pomocnicza funkcja ktora wyciaga tylko godzine z daty!
    weatherForFewDaysHtml.querySelector('.day').textContent = fiveDaysForecast[i].date;
    weatherForFewDaysHtml.querySelector('.day-icon').src = `http://openweathermap.org/img/wn/${fiveDaysForecast[i].icon}@2x.png`;
    weatherForFewDaysHtml.querySelector('.day-desc').textContent = fiveDaysForecast[i].description;
    weatherForFewDaysHtml.querySelector('.day-temp').textContent = fiveDaysForecast[i].temperatura;

    weatherForFewDaysContainer.appendChild(weatherForFewDaysHtml);
  }
}
weatherForFewDaysWrapper(fiveDaysForecast);


// TODO: 
//   change date format
//   ask about temp unit
//   talk about styles