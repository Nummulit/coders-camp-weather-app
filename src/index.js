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
    .then(resp => {
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
      position.coords.longitude
    );
  });
}

window.onload = myLocation();
