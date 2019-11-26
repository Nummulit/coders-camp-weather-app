let cityName = "",
  currentTemp = "",
  currentWindSpeed = "",
  currentWeatherDescription = "",
  currentWeatherIcon = "";
const currentDayForecast = [];
const fiveDaysForecast = [];

const corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/";

function fiveDayThreeHourForecastData(lat, lon) {
  const apiUrl = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=e9c5c4f3beac305dd98167aca8dcc85b`;

  const url = corsAnywhereUrl + apiUrl;
  fetch(url)
    .then(resp => resp.json())
    .then(resp => {
      cityName = resp.city.name;
      currentTemp = Math.floor(resp.list[0].main.temp);
      currentWindSpeed = resp.list[0].wind.speed;
      currentWeatherIcon = resp.list[0].weather[0].icon;
      currentWeatherDescription = resp.list[0].weather[0].description;

      for (const weather of resp.list) {
        if (weather.dt_txt[12] == 0) {
          break;
        } else {
          currentDayForecast.push({
            date: weather.dt_txt,
            temperatura: Math.floor(weather.main.temp),
            windSpeed: weather.wind.speed,
            description: weather.weather[0].description
          });
        }
      }
      resp.list.forEach(weather => {
        if (weather.dt_txt[11] == 1 && weather.dt_txt[12] == 2) {
          fiveDaysForecast.push({
            date: weather.dt_txt,
            temperatura: Math.floor(weather.main.temp),
            windSpeed: weather.wind.speed,
            description: weather.weather[0].description
          });
        }
      });
    })
    .catch(error => {
      console.log(`błąd: ${error}`);
      window.alert("Błąd z połączeniem, spróbuj ponownie za kilka minut");
    });
}

function myLocation() {
  navigator.geolocation.getCurrentPosition(function(position) {
    fiveDayThreeHourForecastData(
      position.coords.latitude,
      position.coords.longitude
    );
  });
}

window.onload = myLocation();
