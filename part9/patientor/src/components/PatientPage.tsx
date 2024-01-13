import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Diagnosis, Entry, Patient } from "../types";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage: React.FC<Props> = ({ diagnoses }) => {
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

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>Gender: {patient.gender}</p>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <h3>Entries</h3>
      {patient.entries.map((entry: Entry) => (
        <div key={entry.id}>
          <p>Date: {entry.date}</p>
          <p>Description: {entry.description}</p>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code, index) => {
                const diagnosis = diagnoses.find(
                  (d: { code: string }) => d.code === code
                );
                return (
                  <li key={index}>
                    {code} {diagnosis?.name}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default PatientPage;
