import React from 'react';
import './App.css';
import HomePage from './Pages/Home';
import TableProvider from './context/TableProvider';

function App() {
  return (
    <TableProvider>
      <HomePage />
    </TableProvider>
  );
}

export default App;
