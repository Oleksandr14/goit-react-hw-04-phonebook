import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormContainer, Button, Input, NameLabel } from './Form.styled';
import { v4 as uuidv4 } from 'uuid';

export const Form = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmitContact = e => {
    e.preventDefault();

    const newContact = { name, number, id: uuidv4() };
    reset();
    if (!onAddContact(newContact, name)) {
      return;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmitContact}>
        <label>
          <NameLabel>Name</NameLabel>
          <Input
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChange}
          />
        </label>
        <label>
          <NameLabel>Namber</NameLabel>
          <Input
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
          />
        </label>
        <Button type="submit">Add contact</Button>
      </FormContainer>
    </>
  );
};

Form.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
