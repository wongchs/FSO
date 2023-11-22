const Country = ({ country }) => {
  return (
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
  );
};

export default Country;
