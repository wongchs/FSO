import { useEffect, useState } from "react";
import personService from "./services/persons";
import "./index.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            setNotification(`Updated ${updatedPerson.name}`);
            setNotificationType("success");
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch((error) => {
            setNotification(
              `Information of '${updatedPerson.name}' has already been removed from server`
            );
            setNotificationType("error");
            setTimeout(() => {
              setNotification(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
          });
      }
    } else {
      const person = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      personService.create(person).then((returnedPersons) => {
        setPersons(persons.concat(returnedPersons));
        setNewName("");
        setNewNumber("");
        setNotification(`Added ${newName}`);
        setNotificationType("success");
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
    }
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deleteObject(id).then(() => {
        const updatedPersons = persons.filter((person) => person.id !== id);
        setPersons(updatedPersons);
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} type={notificationType} />
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
