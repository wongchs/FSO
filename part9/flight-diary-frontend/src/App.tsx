import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import { addDiary, getDiaries } from "./services/diaryService";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDiary, setNewDiary] = useState("");
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    getDiaries().then((data) => {
      setDiaries(data);
    });
  });

  const createDiary = (event) => {
    event.preventDefault();
    const newDiary = {
      date,
      weather,
      visibility,
      comment,
    };
    addDiary(newDiary).then((addedDiary) => {
      setDiaries(diaries.concat(addedDiary));
    });
  };

  return (
    <>
      <div>
        <form onSubmit={createDiary}>
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
            <input
              value={weather}
              onChange={(event) => setWeather(event.target.value)}
            />
          </p>
          <p>
            visibility{" "}
            <input
              value={visibility}
              onChange={(event) => setVisibility(event.target.value)}
            />
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
