import { Entry } from "../types";
import { Box } from "@mui/material";
import { Favorite } from "@mui/icons-material";

interface Props {
  entry: Entry;
}

const HealthCheckEntry = ({ entry }: Props) => {
  const getHeartColor = (rating: number) => {
    switch (rating) {
      case 0:
        return "green";
      case 1:
        return "yellow";
      default:
        return "red";
    }
  };

  return (
    <Box border={1} m={1} p={1}>
      <p>{entry.date}</p>
      <p>{entry.description}</p>
      <p>treatment type: {entry.type}</p>
      <p>
        health rating:{" "}
        <Favorite style={{ color: getHeartColor(entry.healthCheckRating) }} />
      </p>
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

export default HealthCheckEntry;
