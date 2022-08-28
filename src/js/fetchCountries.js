function fetchCountries(countrytName) {
  const url = `https://restcountries.com/v3.1/name/${countrytName}?fields=name,capital,population,flags,languages`;
  return fetch(url)
    .then(response => response.json())
    .catch(error => Notify.failure(error));
}
export { fetchCountries };
