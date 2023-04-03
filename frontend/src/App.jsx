import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(response.data))
      .catch((error) => console.log(error));
  }, []);
}

export default App;
