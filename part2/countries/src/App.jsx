import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredCountries(filteredCountries);
  };

  return (
    <>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        filteredCountries.map((country) => (
          <div key={country.cca3}>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <ul>
              {Object.values(country.languages).map((language, i) => (
                <li key={i}>{language}</li>
              ))}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
          </div>
        ))
      ) : (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}
              <button onClick={() => setFilteredCountries([country])}>
                show
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default App;
