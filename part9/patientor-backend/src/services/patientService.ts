import PatientData from "../../data/patients";
import { NewPatientEntry, PatientEntry, PublicPatient } from "../types";
import { v4 as uuidv4 } from "uuid";

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

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  addPatient,
};
