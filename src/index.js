import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 700;
const inputRef = document.querySelector('#search-box');
const filteredCountryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
  e.preventDefault();
  const countrySearch = e.target.value.trim();
  if (!countrySearch.length) {
    filteredCountryListRef.innerHTML = '';
    countryInfoRef.innerHTML = '';
  } else {
    fetchCountries(countrySearch).then(renderCountries).catch(onFetchError);
  }
}

function renderCountries(country) {
  const filteredCountriesList = country.map(makeCountriesList).join('');
  const filteredCountry = country.map(makeCountry).join('');
  console.log(country);
  if (country.length > 10) {
    filteredCountryListRef.innerHTML = '';
    countryInfoRef.innerHTML = '';

    Notify.info('Too many matches found. Please enter a more specific name.', {
      backOverlay: true,
      backOverlayColor: 'rgba(255, 85, 73, 0.2)',
      fontSize: '18px',
      timeout: 2000,
      clickToClose: true,
      position: 'center-top',
      closeButton: true,
    });
    return;
  } else if (country.length > 1 && country.length <= 10) {
    countryInfoRef.innerHTML = '';
    filteredCountryListRef.innerHTML = filteredCountriesList;
  } else if (country.length === 1) {
    filteredCountryListRef.innerHTML = '';
    countryInfoRef.innerHTML = filteredCountry;
  }
}

function onFetchError() {
  return Notify.failure('Oops, there is no country with that name', {
    backOverlay: true,
    backOverlayColor: 'rgba(255, 85, 73, 0.2)',
    fontSize: '18px',
    timeout: 2000,
    clickToClose: true,
    position: 'center-top',
    closeButton: true,
  });
}
function makeCountriesList({ flags, name }) {
  return ` <li>
        <img src="${flags.svg}" alt="flag of ${name.official}" width="30px">
        <p>${name.official}</p>
      </li>`;
}
function makeCountry({ flags, name, capital, population, languages }) {
  return `<img src="${flags.svg}" alt="flag of ${name.official}" width="40px" />
      <h1>${name.official}</h1>
      <ul>
      <li>
      <p>Capital: ${capital}</p>
      </li>
      <li>
      <p>Population: ${population}</p>
      </li>
      <li>
      <p>Languages: ${Object.values(languages)}</p>
      </li>`;
}
