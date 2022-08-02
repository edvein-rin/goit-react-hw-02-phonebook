import { useMemo, useState } from 'react';

import { generateId } from 'utils/generateId';
import { ContactList } from 'components/ContactList';
import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';

import styles from './styles.module.css';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const filteredContacts = useMemo(() => {
    if (filter === '') return contacts;
    return contacts.filter(
      ({ name }) => name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    );
  }, [contacts, filter]);

  const addContact = (name, number) => {
    const id = generateId();

    setContacts(oldContacts => [
      ...oldContacts,
      {
        id,
        name,
        number,
      },
    ]);
  };

  const isContactInContacts = name => {
    for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i];
      if (contact.name === name) return true;
    }
    return false;
  };

  const onContactFormSubmit = ({ name, number, onSuccess }) => {
    if (isContactInContacts(name)) {
      alert(`${name} is already in contacts`);
    } else {
      addContact(name, number);
      onSuccess();
    }
  };

  const deleteContactById = id => {
    setContacts(oldContacts =>
      oldContacts.filter(contact => contact.id !== id)
    );
  };

  const onContactListItemDeleteButtonClick = ({ id }) => {
    deleteContactById(id);
  };

  return (
    <div className={styles.root}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onContactFormSubmit} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={setFilter} />
      <ContactList
        contacts={filteredContacts}
        onItemDeleteButtonClick={onContactListItemDeleteButtonClick}
      />
    </div>
  );
};
