import React, { useState, useEffect } from 'react';
import formatNumber from './utilities';
import axios from 'axios';

const filterCountriesByName = (countries, search) =>
  countries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()));

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(response.data))
      .catch((error) => console.log(error));
  }, []);

  const filteredCountries = filterCountriesByName(countries, search);

  const handleSearchChange = (event) => setSearch(event.target.value);

  const renderCountries = () => {
    if (filteredCountries.length === 0) {
      return <p>No countries found.</p>;
    }
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      return (
        <div>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Population: {formatNumber(country.population)}</p>
          <img src={country.flags.png} alt={country.name.common} width='300' />
        </div>
      );
    }
    if (filteredCountries.length <= 10) {
      return filteredCountries.map((country) => (
        <div key={country.cca3}>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Population: {formatNumber(country.population)}</p>
          <img src={country.flags.png} alt={country.name.common} width='50' />
        </div>
      ));
    }
    return <p>Too many matches, please specify another filter.</p>;
  };

  return (
    <div>
      <h1>Countries</h1>
      <div>
        <label htmlFor='country-input'>
          Find countries:{' '}
          <input type='text' value={search} id='country-input' onChange={handleSearchChange} />
        </label>
      </div>
      {renderCountries()}
    </div>
  );
}

export default App;
