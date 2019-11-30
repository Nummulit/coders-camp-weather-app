let fiveDaysForecast = [],
  currentTimeInCity = "";
const currentWeather = {
  cityName: "",
  temperature: "",
  windSpeed: "",
  description: "",
  icon: ""
};
const currentDayForecast = [];
const corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/";

function fiveDayThreeHourForecastData(lat, lon, timezone) {
  const apiUrl = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=e9c5c4f3beac305dd98167aca8dcc85b`;
  const url = corsAnywhereUrl + apiUrl;

  fetch(url)
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
      console.log(resp.list[0].dt);
      currentWeather.cityName = resp.city.name;
      currentWeather.temperature = Math.floor(resp.list[0].main.temp);
      currentWeather.windSpeed = resp.list[0].wind.speed;
      currentWeather.icon = resp.list[0].weather[0].icon;
      currentWeather.description = resp.list[0].weather[0].description;

      for (const weather of resp.list) {
        if (weather.dt_txt[12] == 0) {
          currentDayForecast.push({
            date: weather.dt_txt,
            temperatura: Math.floor(weather.main.temp),
            windSpeed: weather.wind.speed,
            description: weather.weather[0].description,
            icon: weather.weather[0].icon
          });
          break;
        } else {
          currentDayForecast.push({
            date: weather.dt_txt,
            temperatura: Math.floor(weather.main.temp),
            windSpeed: weather.wind.speed,
            description: weather.weather[0].description,
            icon: weather.weather[0].icon
          });
        }
      }

      const date = new Date();
      date.getTime();
      date.setUTCSeconds(timezone);
      currentTimeInCity = date.toUTCString();

      fiveDaysForecast = [];
      resp.list.forEach(weather => {
        if (weather.dt_txt[11] == 1 && weather.dt_txt[12] == 2) {
          fiveDaysForecast.push({
            date: weather.dt_txt,
            temperatura: Math.floor(weather.main.temp),
            windSpeed: weather.wind.speed,
            description: weather.weather[0].description,
            icon: weather.weather[0].icon
          });
        }
      });
    })
    .catch(error => {
      console.log(`błąd: ${error}`);
      window.alert("Error, please try again later");
    });
}

function myLocation() {
  navigator.geolocation.getCurrentPosition(function(position) {
    fiveDayThreeHourForecastData(
      position.coords.latitude,
      position.coords.longitude,
      timezone
    );
  });
}

window.onload = myLocation();
