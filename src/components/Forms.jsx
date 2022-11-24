import React, { useContext } from 'react';

import tableContext from '../context/TableContext';

export default function Forms() {
  // const {column, setColumn} = useState(...column:'population');

  const {
    name,
    setName,
    number,
    setNumber,
    column,
    setColumn,
    comparison,
    setComparison,
    data,
    setData } = useContext(tableContext);

  const handleChange = ({ target }) => {
    setName(target.value);
  };

  const handleInput = ({ target }) => {
    setColumn(target.value);
  };

  const handleComparison = ({ target }) => {
    setComparison(target.value);
  };

  // const columnFilter = [];
  const onClick = () => {
    let ret = [];
    switch (comparison) {
    case 'maior que':
      ret = data.filter((planet) => planet[column] > Number(number));
      setData(ret);
      break;
    case 'menor que':
      ret = data.filter((planet) => planet[column] < Number(number));
      setData(ret);
      break;
    case 'igual a':
      ret = data.filter((planet) => planet[column] === number);
      setData(ret);
      break;
    default:
      break;
    }
  };

  return (
    <>
      <form>
        <label htmlFor="name">
          Nome:
          <input
            data-testid="name-filter"
            type="text"
            name="name"
            value={ name }
            id="name"
            onChange={ handleChange }
          />
        </label>
      </form>

      Column:
      <select
        data-testid="column-filter"
        name="column"
        value={ column }
        onChange={ handleInput }
      >

        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>

      </select>

      <select
        data-testid="comparison-filter"
        name="comparison"
        value={ comparison }
        onChange={ handleComparison }

      >

        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>

      </select>

      <input
        data-testid="value-filter"
        type="text"
        name="number"
        value={ number }
        id="number"
        onChange={ (e) => setNumber(e.target.value) }
      />

      <button
        type="button"
        data-testid="button-filter"
        // disabled={ }
        onClick={ onClick }
      >
        Filter
      </button>

    </>
  );
}
