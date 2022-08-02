import { Component } from 'react';

import { generateId } from 'utils/generateId';
import { ContactList } from 'components/ContactList';
import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';

import styles from './styles.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = (name, number) => {
    const id = generateId();

    this.setState(({ contacts: oldContacts }) => ({
      contacts: [
        ...oldContacts,
        {
          id,
          name,
          number,
        },
      ],
    }));
  };

  isContactInContacts = name => {
    for (let i = 0; i < this.state.contacts.length; i++) {
      const contact = this.state.contacts[i];
      if (contact.name === name) return true;
    }
    return false;
  };

  onContactFormSubmit = ({ name, number, onSuccess }) => {
    if (this.isContactInContacts(name)) {
      alert(`${name} is already in contacts`);
    } else {
      this.addContact(name, number);
      onSuccess();
    }
  };

  deleteContactById = id => {
    this.setState(({ contacts: oldContacts }) => ({
      contacts: oldContacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilterChange = filter => {
    this.setState({ filter });
  };

  onContactListItemDeleteButtonClick = ({ id }) => {
    this.deleteContactById(id);
  };

  render() {
    const filteredContacts =
      this.state.filter === ''
        ? this.state.contacts
        : this.state.contacts.filter(
            ({ name }) =>
              name.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1
          );

    return (
      <div className={styles.root}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.onContactFormSubmit} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onItemDeleteButtonClick={this.onContactListItemDeleteButtonClick}
        />
      </div>
    );
  }
}
