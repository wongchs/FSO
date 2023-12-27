import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/name";
  useEffect(() => {
    axios
      .get(`${baseUrl}/${name}`)
      .then((res) => setCountry(res.data))
      .catch(() => setCountry(null));
  }, [name]);

  return country;
};
