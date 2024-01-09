import { useEffect, useState } from "react";
import { DiaryEntry, Visibility, Weather } from "./types";
import { addDiary, getDiaries } from "./services/diaryService";
import axios from "axios";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDiaries().then((data) => {
      setDiaries(data);
    });
  });

  const createDiary = (event: React.FormEvent) => {
    event.preventDefault();
    const newDiary = {
      date,
      weather,
      visibility,
      comment,
    };
    addDiary(newDiary)
      .then((addedDiary) => {
        setDiaries(diaries.concat(addedDiary));
        setError(null);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data);
          setTimeout(() => {
            setError("");
          }, 5000);
        } else {
          console.error(error);
        }
      });
  };

  return (
    <>
      <div>
        <form onSubmit={createDiary}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p>
            date{" "}
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </p>
          <p>
            weather{" "}
            {Object.values(Weather).map((weatherOption) => (
              <label key={weatherOption}>
                <input
                  type="radio"
                  value={weatherOption}
                  checked={weather === weatherOption}
                  onChange={() => setWeather(weatherOption)}
                />
                {weatherOption}
              </label>
            ))}
          </p>
          <p>
            visibility{" "}
            {Object.values(Visibility).map((visibilityOption) => (
              <label key={visibilityOption}>
                <input
                  type="radio"
                  value={visibilityOption}
                  checked={visibility === visibilityOption}
                  onChange={() => setVisibility(visibilityOption)}
                />
                {visibilityOption}
              </label>
            ))}
          </p>
          <p>
            comment{" "}
            <input
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </p>
          <button type="submit">add</button>
        </form>
        <h2>diary entries</h2>
        <ul>
          {diaries.map((diary) => (
            <li key={diary.id}>
              <h3>{diary.date}</h3>
              <p>{diary.weather}</p>
              <p>{diary.visibility}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
