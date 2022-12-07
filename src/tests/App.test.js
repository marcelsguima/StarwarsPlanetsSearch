import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('Se o app inicia em /home', () => {
  render(<App />);
    const nameLabel = screen.getByTestId('name-filter');
    expect(nameLabel).toBeInTheDocument();
  }
);