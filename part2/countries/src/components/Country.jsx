import { useEffect, useState } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const lat = country.capitalInfo.latlng[0];
    const lon = country.capitalInfo.latlng[1];
    const API_KEY = import.meta.env.VITE_SOME_KEY;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [country]);

  console.log(weather);

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
      {weather && weather.main && weather.wind && (
        <div>
          <h3>Weather in {country.capital}</h3>
          <p>temperature: {weather.main.temp} K</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather.description}
          />
          <p>wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Country;
