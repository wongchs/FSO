import PatientData from "../../data/patients";
import { PatientEntry, PublicPatient } from "../types";

const patients: Array<PatientEntry> = PatientData;

const getPatients = (): Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatients,
};
