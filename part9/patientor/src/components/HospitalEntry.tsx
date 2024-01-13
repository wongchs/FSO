import { Entry } from "../types";
import { Box } from "@mui/material";

interface Props {
  entry: Entry;
}

const HospitalEntry = ({ entry }: Props) => {
  return (
    <Box border={1} m={1} p={1}>
      <p>{entry.date}</p>
      <p>{entry.description}</p>
      <p>treatment type: {entry.type}</p>
      <p>{entry.description}</p>
      <p>
        Discharge: {entry.discharge.date}, {entry.discharge.criteria}
      </p>
      <p>{entry.diagnosisCodes}</p>
      <p>diagnosed by {entry.specialist}</p>
    </Box>
  );
};

export default HospitalEntry;
