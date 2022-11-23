import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import tableContext from './TableContext';
import planetsFetch from '../services/APIrequests';

export default function TableProvider({ children }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    planetsFetch().then((result) => setData(result));
  }, []);

  const planets = useMemo(() => ({
    data,
    name,
    setName,
  }), [data, name]);

  return (
    <tableContext.Provider value={ planets }>
      {children}
    </tableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
