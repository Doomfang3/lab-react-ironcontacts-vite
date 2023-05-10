import { useState } from "react";
import "./App.css";
import contactsData from "./contacts.json";

function App() {
	const [contacts, setCcontacts] = useState([...contactsData].splice(0, 5));

	const addRandomContact = () => {
		if (contacts.length < contactsData.length) {
			const restContacts = contactsData.filter((contactData) => {
				let isRest = true;
				contacts.forEach((contact) => {
					if (contact.id === contactData.id) isRest = false;
				});
				return isRest;
			});
			const randomIndex = Math.floor(restContacts.length * Math.random());
			const newContacts = [...contacts];
			newContacts.unshift(restContacts[randomIndex]);
			setCcontacts(newContacts);
		}
	};

	const sortByPopularity = () => {
		const newContacts = contacts.toSorted(
			(a, b) => b.popularity - a.popularity
		);
		setCcontacts(newContacts);
	};

	const sortByName = () => {
		const newContacts = contacts.toSorted((a, b) => {
			return a.name >= b.name ? 1 : -1;
		});
		setCcontacts(newContacts);
	};

	const deleteContact = (id) => {
		const index = contacts.findIndex((contact) => contact.id === id);
		const newContacts = contacts.toSpliced(index, 1);
		setCcontacts(newContacts);
	};

	return (
		<div className="App">
			<h1>IronContacts</h1>
			<button type="button" onClick={addRandomContact}>
				Add Random Contact
			</button>
			<button type="button" onClick={sortByPopularity}>
				Sort By Popularity
			</button>
			<button type="button" onClick={sortByName}>
				Sort By Name
			</button>
			<table>
				<thead>
					<tr>
						<th>Picture</th>
						<th>Name</th>
						<th>Popularity</th>
						<th>Won Oscar</th>
						<th>Won Emmy</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{contacts.map((contact) => {
						return (
							<tr key={contact.id}>
								<td>
									<img src={contact.pictureUrl} alt="profile" />
								</td>
								<td>{contact.name}</td>
								<td>{contact.popularity.toFixed(2)}</td>
								<td>{contact.wonOscar ? "🏆" : ""}</td>
								<td>{contact.wonEmmy ? "🏆" : ""}</td>
								<td>
									<button
										type="button"
										onClick={() => deleteContact(contact.id)}
									>
										Delete
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default App;
