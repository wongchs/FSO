import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import Country from "./components/Country";

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
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        <Country country={filteredCountries[0]} />
      ) : (
        <Countries
          filteredCountries={filteredCountries}
          setFilteredCountries={setFilteredCountries}
        />
      )}
    </>
  );
};

export default App;
