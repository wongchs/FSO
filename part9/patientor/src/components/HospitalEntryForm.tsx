import { useState } from "react";
import { Diagnosis, EntryWithoutId } from "../types";

interface Props {
  addEntry: (entry: EntryWithoutId) => void;
  diagnosisData: Diagnosis[];
}

const HospitalEntryForm = ({ addEntry, diagnosisData }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<string>>([]);
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    addEntry({
      description,
      date,
      specialist,
      diagnosisCodes,
      type: "Hospital",
      discharge: { date: dischargeDate, criteria: dischargeCriteria },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <label>
        Specialist:
        <input
          type="text"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        />
      </label>
      <label>
        Diagnosis Codes:
        <select
          multiple
          value={diagnosisCodes}
          onChange={(e) =>
            setDiagnosisCodes(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
        >
          {diagnosisData.map((diagnosis) => (
            <option key={diagnosis.code} value={diagnosis.code}>
              {diagnosis.code}: {diagnosis.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Discharge Date:
        <input
          type="date"
          value={dischargeDate}
          onChange={(e) => setDischargeDate(e.target.value)}
        />
      </label>
      <label>
        Discharge Criteria:
        <input
          type="text"
          value={dischargeCriteria}
          onChange={(e) => setDischargeCriteria(e.target.value)}
        />
      </label>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default HospitalEntryForm;
