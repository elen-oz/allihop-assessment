import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatNumber } from './utilities';

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
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const filteredCountries = filterCountriesByName(countries, search);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const renderSingleCountry = (country) => {
    return (
      <div className='container'>
        <div className='card col-md-5'>
          <div>
            <img
              className='card-img-top rounded float-start'
              src={country.flags.png}
              alt={country.name.common}
            />
          </div>

          <div className='card-body'>
            <h2>{country.name.common}</h2>
            <p className='lead'>Capital: {country.capital}</p>
            <p>Population: {formatNumber(country.population)}</p>
            <p>Where located: {country.subregion}</p>
            <p>
              <a
                href={country.maps.googleMaps}
                target='_blank'
                rel='noopener noreferrer'
              >
                See on map
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const handleListOfCountries = () => {
    return filteredCountries.map((country) => (
      <div className='el-list-cards card mb-1' key={country.cca3}>
        <div className='card-body' key={country.cca3}>
          <div className='col-md-5 float-start el-card-country'>
            <h2 className='display-6'>{country.name.common}</h2>
            <ul className='list-unstyled'>
              <li>Capital: {country.capital}</li>
              <li>Population: {formatNumber(country.population)}</li>
            </ul>
          </div>

          <div className='card col-md-2 float-end'>
            <div>
              <img
                className='card-img-top rounded'
                src={country.flags.png}
                alt={country.name.common}
              />
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const renderCountries = () => {
    if (filteredCountries.length === 0) {
      return <p>No countries found.</p>;
    }
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      return renderSingleCountry(country);
    }
    if (filteredCountries.length <= 10) {
      return handleListOfCountries();
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
