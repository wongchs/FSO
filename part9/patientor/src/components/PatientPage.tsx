import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Entry, Patient } from "../types";
import EntryDetails from "./EntryDetails";
import HospitalEntryForm from "./HospitalEntryForm";

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const fetchedPatient = await patientService.getOne(id);
        setPatient(fetchedPatient);
      }
    };
    fetchPatient();
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  const addEntry = (newEntry: Entry) => {
    setPatient((oldPatient) => {
      if (oldPatient === null) {
        console.error("Patient is null");
        return null;
      }
      return {
        ...oldPatient,
        entries: [...oldPatient.entries, newEntry],
      };
    });
  };

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>Gender: {patient.gender}</p>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
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
