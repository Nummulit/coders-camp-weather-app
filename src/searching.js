// DON'T DO TOO MANY REQUESTS OR THE ACCOUNT WILL BE BLOCKED AND YOU WILL HAVE TO CREATE A NEW ONE!
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
      orderby=population`.replace(/\s/g, '');  // Removes any whitespace
  const response = await fetch(url);
  const data = await response.json();
  const cities = await data.geonames.map(el => {
    return {
      name: el.name,
      countryCode : el.countryCode,
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
  console.log(currentCity);  // Logging only for testing.
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