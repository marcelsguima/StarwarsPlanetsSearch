import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';
import TableProvider from '../context/TableProvider';

describe('Testando se no componente forms...', ()=>{
test('os campos e botões são renderizados corretamente', () => {
      render(<TableProvider><App /></TableProvider>);
    
      expect(screen.getByTestId('name-filter')).toBeInTheDocument();
      expect(screen.getByTestId('column-filter')).toBeInTheDocument();
      expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();
      expect(screen.getByTestId('value-filter')).toBeInTheDocument();
      expect(screen.getByTestId('button-filter')).toBeInTheDocument();
    });
  

test('se o campo nome aceita input', () => {
      render(<TableProvider><App /></TableProvider>);
    
      const nameField = screen.getByTestId('name-filter');

      userEvent.type(nameField, 'al');
      expect(nameField.value).toBe('al')
    })

test('se o campo value aceita input', () => {
      render(<TableProvider><App /></TableProvider>);
    
      const valueField = screen.getByTestId('value-filter');

      userEvent.type(valueField, '{backspace}0');
      expect(valueField.value).toBe('0')
    })


test('se o campo column aceita input', () => {
      render(<TableProvider><App /></TableProvider>);
    
      const columnField = screen.getByTestId('column-filter');

      userEvent.selectOptions(columnField, 'surface_water')
      expect(columnField.value).toBe('surface_water')
    })



test('se o button filter pode ser clickado', () => {
  render(<TableProvider><App /></TableProvider>);
  
      const buttonFilter = screen.getByTestId('button-filter');
      expect(buttonFilter).toBeInTheDocument();
      userEvent.click(buttonFilter);
  

    });


test('se o case switch funciona corretamente', async () => {
    global.fetch = jest.fn(async () => {
      return {
        json: async function() { return testData }
      }
    })
      render(<App />);
      
          const column = screen.getByTestId('column-filter');
          const value = screen.getByTestId('value-filter');
          const btn = screen.getByTestId('button-filter');




          const comparisonField = screen.getByTestId('comparison-filter');
          expect(comparisonField).toBeInTheDocument();
          
          userEvent.selectOptions(column, 'population');
          userEvent.selectOptions(comparisonField, 'igual a');
          userEvent.type(value, '7200');
          userEvent.click(btn);
          const planet = await screen.findByText('Hoth');
          expect(planet).toBeInTheDocument();
          // userEvent.selectOptions(comparisonField, 'menor que')
          // expect(comparisonField.value).toBe('menor que')
        
          // userEvent.selectOptions(comparisonField, 'maior que')
          // expect(comparisonField.value).toBe('maior que')
    
          
          expect(comparisonField.value).toBe('igual a')

        });



  }  
)
 
