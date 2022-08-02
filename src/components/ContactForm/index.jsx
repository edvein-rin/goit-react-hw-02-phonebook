import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

export class ContactForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit({
      name: this.state.name,
      number: this.state.number,
      onSuccess: this.resetForm,
    });
  };

  resetForm = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  handleNameInputChange = e => {
    this.setState({
      name: e.target.value,
    });
  };

  handleNumberInputChange = e => {
    this.setState({ number: e.target.value });
  };

  render() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <label className={styles.inputWrapper}>
          <span className={styles.inputLabel}>Name</span>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={this.handleNameInputChange}
          />
        </label>
        <label className={styles.inputWrapper}>
          <span className={styles.inputLabel}>Number</span>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.state.number}
            onChange={this.handleNumberInputChange}
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}
