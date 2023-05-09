import React, { useState } from "react";
import "./App.css";
import contacts from "./contacts.json";

function App() {
  const [contactsArray, setContactsArray] = useState(contacts.slice(0, 5));

  function renderContacts() {
    return contactsArray.map((contact) => (
      <tr key={contact.id}>
        <td>
          <img src={contact.pictureUrl} alt={contact.name} />
        </td>
        <td>{contact.name}</td>
        <td>{contact.popularity.toFixed(2)}</td>
        <td>{contact.wonOscar ? "🏆" : ""}</td>
        <td>{contact.wonEmmy ? "🏆" : ""}</td>
        <button onClick={() => deleteContact(contact.id)}>Delete</button>
      </tr>
    ));
  }

  function addRandomContact() {
    // Create a new array containing contacts that are not in contactsArray
    const remainingContacts = contacts.filter((contact) => {
      // Check if the current contact is in the contactsArray
      const existingContact = contactsArray.find((existingContact) => {
        return existingContact.id === contact.id;
      });

      // Include the contact in remainingContacts only if it's not in contactsArray
      return !existingContact;
    });

    if (remainingContacts.length === 0) {
      alert("All contacts are already displayed.");
      return;
    }

    // Select a random contact from the remainingContacts array
    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    const newContact = remainingContacts[randomIndex];

    // Add the selected contact to the beginning of contactsArray
    setContactsArray((prevContacts) => [newContact, ...prevContacts]);
  }

  function sortByName() {
    const sortedArray = [...contactsArray].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setContactsArray(sortedArray);
  }

  function sortByPopularity() {
    const sortedArray = [...contactsArray].sort(
      (a, b) => b.popularity - a.popularity
    );
    setContactsArray(sortedArray);
  }

  function deleteContact(contactId) {
    const updatedContacts = contactsArray.filter(
      (contact) => contact.id !== contactId
    );
    setContactsArray(updatedContacts);
  }

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByPopularity}>Sort by Popularity</button>
      <button onClick={sortByName}>Sort by Name</button>

      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{renderContacts()}</tbody>
      </table>
    </div>
  );
}

export default App;
