let cityName = "",
    currentTemp = "",
    currentWindSpeed = "",
    currentWeatherDescription = "",
    currentWeatherIcon = "";


function currentWeather(cityID) {
    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?id=${cityID}&units=metric&appid=e9c5c4f3beac305dd98167aca8dcc85b`;
    const corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/";
    const url = corsAnywhereUrl + apiUrl;

    fetch(url)
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp);
            cityName = resp.city.name;
            currentTemp = resp.list[0].main.temp;
            currentWindSpeed = resp.list[0].wind.speed;
            currentWeatherIcon = resp.list[0].weather[0].icon;
            currentWeatherDescription = resp.list[0].weather[0].description;
        });

}


currentWeather(6556679);