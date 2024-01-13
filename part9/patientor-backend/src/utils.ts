import {
  NewPatientEntry,
  Gender,
  SickLeave,
  Discharge,
  DiagnosisEntry,
  EntryWithoutId,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name ${name}`);
  }

  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation ${occupation}`);
  }

  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn ${ssn}`);
  }

  return ssn;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }

  return specialist;
};

const parseDiagnosisCodes = (
  object: unknown
): Array<DiagnosisEntry["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<DiagnosisEntry["code"]>;
  }

  return object.diagnosisCodes as Array<DiagnosisEntry["code"]>;
};

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
  if (healthCheckRating === undefined) {
    throw new Error("Incorrect or missing health check rating");
  }

  if (
    Number.isNaN(Number(healthCheckRating)) ||
    Number(healthCheckRating) < 0 ||
    Number(healthCheckRating) > 3
  ) {
    throw new Error("Incorrect or missing health check rating");
  }

  return Number(healthCheckRating);
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing employer name");
  }

  return employerName;
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
  if (!sickLeave) {
    return undefined;
  }

  if (typeof sickLeave !== "object") {
    throw new Error("Incorrect or missing sick leave");
  }

  if (
    !("startDate" in sickLeave) ||
    !("endDate" in sickLeave) ||
    !isString(sickLeave.startDate) ||
    !isString(sickLeave.endDate) ||
    !isDate(sickLeave.startDate) ||
    !isDate(sickLeave.endDate)
  ) {
    throw new Error("Incorrect or missing sick leave");
  }

  return sickLeave as SickLeave;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect or missing discharge");
  }

  if (
    !("date" in discharge) ||
    !("criteria" in discharge) ||
    !isString(discharge.date) ||
    !isString(discharge.criteria) ||
    !isDate(discharge.date)
  ) {
    throw new Error("Incorrect or missing discharge");
  }

  return discharge as Discharge;
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (
    !object ||
    typeof object !== "object" ||
    !("type" in object) ||
    !("description" in object) ||
    !("date" in object) ||
    !("specialist" in object)
  ) {
    throw new Error("Incorrect or missing data");
  }

  const commonFields = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object),
  };

  switch (object.type) {
    case "HealthCheck":
      return {
        ...commonFields,
        type: "HealthCheck",
        healthCheckRating:
          "healthCheckRating" in object
            ? parseHealthCheckRating(object.healthCheckRating)
            : 0,
      };
    case "OccupationalHealthcare":
      if (!("employerName" in object)) {
        throw new Error("Incorrect or missing employerName");
      }
      return {
        ...commonFields,
        type: "OccupationalHealthcare",
        employerName: parseEmployerName(object.employerName),
        sickLeave:
          "sickLeave" in object ? parseSickLeave(object.sickLeave) : undefined,
      };
    case "Hospital":
      if (!("discharge" in object)) {
        throw new Error("Incorrect or missing discharge");
      }
      return {
        ...commonFields,
        type: "Hospital",
        discharge: parseDischarge(object.discharge),
      };
    default:
      throw new Error(`Unhandled entry type: ${object.type}`);
  }
};

export default toNewPatientEntry;
