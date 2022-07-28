import PropTypes from 'prop-types';

import styles from './styles.module.css';

export const ContactList = ({ contacts, onItemDeleteButtonClick }) => (
  <ul>
    {contacts.map(contact => {
      const { id, name, number } = contact;
      const handleDeleteButtonClick = () => {
        onItemDeleteButtonClick(contact);
      };

      return (
        <li key={id} className={styles.contact}>
          <span>
            {name}: {number}
          </span>
          <button
            className={styles.button}
            type="button"
            onClick={handleDeleteButtonClick}
          >
            Delete
          </button>
        </li>
      );
    })}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onItemDeleteButtonClick: PropTypes.func.isRequired,
};
