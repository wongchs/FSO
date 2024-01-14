import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Entry, EntryWithoutId, Patient } from "../types";
import EntryDetails from "./EntryDetails";
import HospitalEntryForm from "./HospitalEntryForm";

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const fetchedPatient = await patientService.getOne(id);
        setPatient(fetchedPatient);
      }
    };
    fetchPatient();
  }, [id]);

  const addEntry = async (newEntry: EntryWithoutId) => {
    try {
      if (id) {
        const addedEntry = await patientService.addEntry(
          id as string,
          newEntry
        );
        setPatient(addedEntry);
      }
    } catch (error) {
      setErrorMessage("bad request.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>Gender: {patient.gender}</p>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      {errorMessage && <p>{errorMessage}</p>}
      <HospitalEntryForm addEntry={addEntry} />
      <h3>Entries</h3>
      {patient.entries.map((entry: Entry) => (
        <div key={entry.id}>
          <EntryDetails entry={entry} />
        </div>
      ))}
    </div>
  );
};

export default PatientPage;
