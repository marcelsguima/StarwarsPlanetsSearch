import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import tableContext from './TableContext';
import planetsFetch from '../services/APIrequests';

export default function TableProvider({ children }) {
  const [defaultColum, setdefaultColum] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [data, setData] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [name, setName] = useState('');
  const [column, setColumn] = useState('population');
  const [number, setNumber] = useState(0);
  const [comparison, setComparison] = useState('maior que');
  const [filterID, setFilterID] = useState(0);
  const [savedFilters, setSavedFilters] = useState([]);
  const [columList, setColumnList] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

  useEffect(() => {
    planetsFetch().then((result) => {
      setData(result); setDataFiltered(result);
    });
  }, []);

  const planets = useMemo(() => ({
    defaultColum,
    setdefaultColum,
    data,
    setData,
    name,
    setName,
    number,
    setNumber,
    column,
    setColumn,
    comparison,
    setComparison,
    dataFiltered,
    setDataFiltered,
    filterID,
    setFilterID,
    savedFilters,
    setSavedFilters,
    columList,
    setColumnList,
  }), [data, name, number, column, comparison, dataFiltered,
    filterID, savedFilters, columList, defaultColum]);

  return (
    <tableContext.Provider value={ planets }>
      {children}
    </tableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
