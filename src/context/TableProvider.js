import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import tableContext from './TableContext';
import planetsFetch from '../services/APIrequests';

export default function TableProvider({ children }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [column, setColumn] = useState('population');
  const [number, setNumber] = useState(0);
  const [comparison, setComparison] = useState('maior que');

  useEffect(() => {
    planetsFetch().then((result) => setData(result));
  }, []);

  const planets = useMemo(() => ({
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
  }), [data, name, number, column, comparison]);

  return (
    <tableContext.Provider value={ planets }>
      {children}
    </tableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
