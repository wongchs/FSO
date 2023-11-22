const Countries = ({ filteredCountries, setFilteredCountries }) => (
  <ul>
    {filteredCountries.map((country) => (
      <li key={country.cca3}>
        {country.name.common}
        <button onClick={() => setFilteredCountries([country])}>show</button>
      </li>
    ))}
  </ul>
);

export default Countries;
