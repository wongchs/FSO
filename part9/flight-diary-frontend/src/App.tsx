import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import axios from "axios";
import { getDiaries } from "./services/diaryService";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getDiaries().then((data) => {
      setDiaries(data);
    });
  });

  return (
    <>
      <div>
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
