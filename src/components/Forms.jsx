import React, { useContext, useEffect } from 'react';

import tableContext from '../context/TableContext';

export default function Forms() {
  const {
    // defaultColum,
    name,
    setName,
    number,
    setNumber,
    column,
    setColumn,
    comparison,
    setComparison,
    data,
    // setData,
    dataFiltered,
    setDataFiltered,
    savedFilters,
    setSavedFilters,
    filterID,
    setFilterID,
    columList,
    setColumnList,
  } = useContext(tableContext);

  // const rvmFilter = (index) => {
  //   const rmv = savedFilters.filter((_, i) => i !== index);
  //   setColumnList(rmv);
  // };

  const rvmFilter = (ID) => {
    const filterGet = savedFilters.filter((item) => item.filterID === ID)[0].column;
    console.log(filterGet);
    setSavedFilters(
      savedFilters.filter((item) => item.filterID !== ID),
    );
    setColumnList((prevState) => [...prevState, filterGet]);
  };

  const filters = () => {
    const allFilters = [...savedFilters, {
      column, number, comparison, filterID }];
    setSavedFilters(allFilters);
  };

  useEffect(() => {
    if (savedFilters.length === 0) {
      setDataFiltered(data);
    }
    if (savedFilters.length !== 0) {
      console.log('rmv unknown');
    }
    setFilterID(filterID + 1);
    setName('');
    setColumn(columList[0]);// criar lógica de padrão
    setNumber(0);
    setComparison('maior que');
    const compare = () => {
      savedFilters.forEach((filter) => {
        let rFilters = [];
        switch (filter.comparison) {
        case 'maior que':
          rFilters = dataFiltered.filter((p) => p[filter.column] > Number(filter.number));
          console.log(rFilters);
          setDataFiltered(rFilters);
          break;
        case 'menor que':
          rFilters = dataFiltered.filter((p) => p[filter.column] < Number(filter.number));
          setDataFiltered(rFilters);
          break;
        case 'igual a':
          rFilters = dataFiltered.filter((p) => p[filter.column] === filter.number);
          setDataFiltered(rFilters);
          break;
        default:
          break;
        }
      });
    };
    compare();
  }, [savedFilters, columList,
    setColumn, setComparison,
    setDataFiltered, setFilterID,
  ]);

  useEffect(() => {
    savedFilters.forEach((filter) => {
      let rFilters = [];
      console.log('filtrando de novo');
      switch (filter.comparison) {
      case 'maior que':
        rFilters = data.filter((p) => p[filter.column] > Number(filter.number));
        setDataFiltered(rFilters);

        break;
      case 'menor que':
        rFilters = data.filter((p) => p[filter.column] < Number(filter.number));
        setDataFiltered(rFilters);

        break;
      case 'igual a':
        rFilters = data.filter((p) => p[filter.column] === filter.number);
        setDataFiltered(rFilters);
        if (savedFilters.length !== 1) {
          setDataFiltered(dataFiltered.filter((item) => item.population !== 'unknown'));
          setDataFiltered(dataFiltered.filter((item) => item.rotation_period !== '24'));
        }
        break;
      default:
        break;
      }
    });
  }, [data, savedFilters, setDataFiltered]);

  // function deleteFilter(id){
  //   setTodos([...todos].filter(todo => todo.id !== id));
  // }
  // const rvmOption = (OP) => {
  //   setColumnList(
  //     columList.filter((item) => item.value !== OP),
  //   );
  //   console.log(columList);
  // };

  const checkFilter = () => {
    setColumnList(columList.filter((f) => f !== column));
    // acessar o array de filtros
    // remover a opção do dropdown
  };
  const onClick = () => {
    filters();
    checkFilter();

    // reescrever estado removendo com elemento com o filter
    // salvar o intem removido em um objeto para remapear
    //
    // resetData();
  };

  const onChange = ({ target }) => {
    setName(target.value);
    if (target.value === 0) {
      setDataFiltered(data);
    } else {
      setDataFiltered(data.filter(
        (planet) => planet.name.toLowerCase().includes(target.value),
      ));
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
            onChange={ (e) => onChange(e) }
          />
        </label>
      </form>

      Column:
      <select
        data-testid="column-filter"
        name="column"
        value={ column }
        onChange={ (e) => setColumn(e.target.value) }
      >

        {columList.map((op) => (<option key={ op } value={ op }>{op}</option>))}

      </select>

      <select
        data-testid="comparison-filter"
        name="comparison"
        value={ comparison }
        onChange={ (e) => setComparison(e.target.value) }

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

      <div>
        <ul>
          {savedFilters.map((f) => (
            <div key={ f.filterID } data-testid="filter">
              <li>{f.filterID}</li>
              <li>{f.column}</li>
              <li>{f.comparison}</li>
              <li>{f.number}</li>
              <button
                type="button"
                onClick={ () => { rvmFilter(f.filterID); } }
              >
                X

              </button>
            </div>

          ))}
        </ul>
      </div>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => { setSavedFilters([]); } }
      >
        Remove All Filters
      </button>
    </>
  );
}
