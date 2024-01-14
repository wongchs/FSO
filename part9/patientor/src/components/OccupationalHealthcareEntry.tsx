import { Entry } from "../types";
import { Box } from "@mui/material";

interface Props {
  entry: Entry;
}

const OccupationalHealthcareEntry = ({ entry }: Props) => {
  return (
    <Box border={1} m={1} p={1}>
      <p>{entry.date}</p>
      <p>{entry.description}</p>
      <p>treatment type: {entry.type}</p>
      <p>employer: {entry.employerName}</p>
      <ul>
        {entry.diagnosis?.map((diagnose) => (
          <li key={diagnose.code}>
            {diagnose.code} {diagnose.name}
          </li>
        ))}
      </ul>
      <p>diagnosed by {entry.specialist}</p>
    </Box>
  );
};

export default OccupationalHealthcareEntry;
