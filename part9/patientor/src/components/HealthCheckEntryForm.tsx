import { useState } from "react";
import { EntryWithoutId, HealthCheckRating } from "../types";

interface Props {
  addEntry: (entry: EntryWithoutId) => void;
}

const HealthCheckEntryForm = ({ addEntry }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<string>>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    addEntry({
      description,
      date,
      specialist,
      diagnosisCodes,
      type: "HealthCheck",
      healthCheckRating,
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
        Health Rating:
        <input
          type="number"
          min={0}
          max={3}
          value={healthCheckRating}
          onChange={(e) =>
            setHealthCheckRating(Number(e.target.value) as HealthCheckRating)
          }
        />
      </label>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default HealthCheckEntryForm;
