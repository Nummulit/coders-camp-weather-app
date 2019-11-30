// DON'T DO TOO MANY REQUESTS OR THE ACCOUNT WILL BE BLOCKED AND YOU WILL HAVE TO CREATE A NEW ONE!
const userName = 'edud';

// Field for searching the cities
const citySearchField = document.querySelector('.form-control');
// <ul> for displaying the results
const searchResults = document.querySelector('.suggestions');
// Submit Button
const submitBtn = document.querySelector('.button');
// Currently selected city
let currentCity = '';

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
      lon: parseFloat(el.lng)
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


citySearchField.addEventListener('input', event => {
  clearCities(searchResults);
  displayCities(searchResults, event.target.value, citySearchField);
});

submitBtn.addEventListener('click', event => {
  currentCity = citySearchField.value;
});

document.body.addEventListener('keyup', (event) => {
  if (event.code === "Escape") clearCities(searchResults);
});