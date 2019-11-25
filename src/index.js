let cityName = "",
  currentTemp = "",
  currentWindSpeed = "",
  currentWeatherDescription = "",
  currentWeatherIcon = "";

const fiveDaysForecast = [];

const corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/";

function fiveDayThreeHourForecastData(lat, lon) {
  const apiUrl = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=e9c5c4f3beac305dd98167aca8dcc85b`;

  const url = corsAnywhereUrl + apiUrl;
  fetch(url)
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
      cityName = resp.city.name;
      currentTemp = Math.floor(resp.list[0].main.temp);
      currentWindSpeed = resp.list[0].wind.speed;
      currentWeatherIcon = resp.list[0].weather[0].icon;
      currentWeatherDescription = resp.list[0].weather[0].description;

      resp.list.forEach(weather => {
        fiveDaysForecast.push({
          date: weather.dt_txt,
          temperatura: Math.floor(weather.main.temp),
          windSpeed: weather.wind.speed,
          icon: weather.weather[0].icon,
          description: weather.weather[0].description
        });
      });
    });
}

fiveDayThreeHourForecastData(42.957561, -77.057472);
