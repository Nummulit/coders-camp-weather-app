// DON'T DO TOO MANY REQUESTS OR THE ACCOUNT WILL BE BLOCKED AND YOU WILL HAVE TO CREATE A NEW ONE!
const userName = 'edud';

// Field for searching the cities
const citySearchField = document.getElementById('city-search-field');
// <ul> for displaying the results
const searchResults = document.getElementById('search-results');


// Looks for all cities in geonames.org starting with specified `text`.
// Returns a Promise.
async function findCities(text) {
  const url = `http://api.geonames.org/searchJSON?
      username=${userName}&
      maxRows=10&
      style=short&
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
async function displayCities(listNode, text) {
  let cities = await findCities(text);
  for (city of cities) {
    console.log(city);
    listNode.innerHTML += `
      <li>
        <span class="city-name">${city.name}</span>
        <span class="country-code">${city.countryCode}</span>
      </li>
    `
  }
}

// Clears the content of specified listNode.
function clearCities(listNode) {
  listNode.innerHTML = '';
}


citySearchField.addEventListener('input', el => {
  clearCities(searchResults);
  displayCities(searchResults, el.target.value);
});
