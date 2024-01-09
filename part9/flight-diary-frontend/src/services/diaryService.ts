import axios from "axios";
import { DiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getDiaries = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data);
};

export const addDiary = (newDiary: Omit<DiaryEntry, "id">) => {
  return axios
    .post<DiaryEntry>(baseUrl, newDiary)
    .then((response) => response.data);
};
