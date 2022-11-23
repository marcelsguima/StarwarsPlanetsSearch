import React, { useContext } from 'react';
import tableContext from '../context/TableContext';

export default function Forms() {
  const searchInput = useContext(tableContext);

  const handleChange = ({ target }) => {
    searchInput.setName(target.value);
  };

  return (
    <form>
      <label htmlFor="name">
        Nome:
        <input
          data-testid="name-filter"
          type="text"
          name="name"
          value={ searchInput.name }
          id="name"
          onChange={ handleChange }
        />
      </label>

    </form>
  );
}
