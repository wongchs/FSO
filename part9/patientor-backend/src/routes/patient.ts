import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry, { toNewEntry } from "../utils";
import { v4 as uuid } from "uuid";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});

patientRouter.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

patientRouter.get("/:id", (req, res) => {
  const patient = patientService.getOnePatient(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

patientRouter.post("/:id/entries", (req, res) => {
  try {
    const newEntryWithoutId = toNewEntry(req.body);
    const newEntry = {
      id: uuid(),
      ...newEntryWithoutId,
    };
    const patient = patientService.getOnePatient(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: "patient not found" });
    }

    patient.entries.push(newEntry);
    return res.json(patient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    return res.status(400).send(errorMessage);
  }
});

export default patientRouter;
