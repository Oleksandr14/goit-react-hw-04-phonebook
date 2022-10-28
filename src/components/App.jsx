import { useState, useEffect } from 'react';

import { GlobalStyle } from '../styles/GlobalStyle';
import { Box } from './Box';

import { Form } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';

const LS_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contact = localStorage.getItem(LS_KEY);
    const parseContacts = JSON.parse(contact);

    if (parseContacts) {
      setContacts(p => [...p, ...parseContacts]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact, name) => {
    const namesArray = contacts.map(contact => contact.name.toLowerCase());

    if (namesArray.includes(name.toLowerCase())) {
      return alert(`${name} is already in contacts`);
    }

    setContacts(p => [...p, newContact]);
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(el =>
      el.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const changeFilter = filter => setFilter(filter);

  return (
    <Box p={4}>
      <h1>Phonebook</h1>
      <Form onAddContact={addContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} onChangeFilter={changeFilter} />
      {contacts.length > 0 ? (
        <Contacts contacts={filterContacts()} onDeleteContact={deleteContact} />
      ) : null}
      <GlobalStyle />
    </Box>
  );
};
