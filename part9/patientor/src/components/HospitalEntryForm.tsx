import { useState } from "react";
import { Entry, EntryWithoutId } from "../types";

interface Props {
  addEntry: (entry: EntryWithoutId) => void;
}

const HospitalEntryForm = ({ addEntry }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<string>>([]);
  const [type, setType] = useState<Entry["type"]>("Hospital");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    addEntry({
      description,
      date,
      specialist,
      diagnosisCodes,
      type,
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
        <input
          type="text"
          value={diagnosisCodes.join(",")}
          onChange={(e) => setDiagnosisCodes(e.target.value.split(","))}
        />
      </label>
      <label>
        Type:
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value as HospitalEntry["type"])}
        />
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
