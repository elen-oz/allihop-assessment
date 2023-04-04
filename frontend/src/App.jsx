import React, { useState, useEffect } from 'react';
import axios from 'axios';
import formatNumber from './utilities';

const filterCountriesByName = (countries, search) =>
  countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

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
        <div className='card'>
          <img
            className='card-img-top'
            src={country.flags.png}
            alt={country.name.common}
            width='200'
          />
          <div className='card-body'>
            <h2>{country.name.common}</h2>

            <p className='lead'>Capital: {country.capital}</p>
            <p>Population: {formatNumber(country.population)}</p>
          </div>
        </div>
      );
    }
    if (filteredCountries.length <= 10) {
      return filteredCountries.map((country) => (
        <div className='card mb-1' key={country.cca3}>
          <div className='card-body' key={country.cca3}>
            <h2 className='display-6'>{country.name.common}</h2>
            <ul className='list-unstyled'>
              <li>Capital: {country.capital}</li>
              <li>Population: {formatNumber(country.population)}</li>
            </ul>
          </div>
        </div>
      ));
    }
    return (
      <p className='lead'>Too many matches, please specify another filter.</p>
    );
  };

  return (
    <section className='container-fluid'>
      <div className='row mb-3'>
        <div className='col-md-10 col-lg-8 mx-auto'>
          <label htmlFor='input-country' className='form-label'>
            Find countries:
          </label>

          <div className='input-group'>
            <input
              type='text'
              className='form-control'
              id='input-country'
              aria-describedby='basic-addon3 basic-addon4'
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          <div className='form-text mb-3' id='basic-addon4'>
            Example: Sweden
          </div>
          {renderCountries()}
        </div>
      </div>
    </section>
  );
}

export default App;
