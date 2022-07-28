import PropTypes from 'prop-types';

export const Filter = ({ value, onChange }) => {
  const handleChange = e => {
    onChange(e.target.value);
  };

  return (
    <div>
      <p>Find contacts by name</p>
      <input name="filter" value={value} onChange={handleChange} />
    </div>
  );
};

Filter.propType = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
