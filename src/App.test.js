import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import usePersistentState from './usePersistentState';
import FakeIndexedDB from 'fake-indexeddb';

// Replace global indexedDB with fake-indexeddb
global.indexedDB = FakeIndexedDB;

describe('usePersistentState', () => {
  it('should update and persist the state', async () => {
    const TestComponent = () => {
      const [value, setValue] = usePersistentState('testDB', 'testStore', 'testKey', '');

      const handleChange = (e) => {
        setValue(e.target.value);
      };

      return (
        <div>
          <input type="text" value={value} onChange={handleChange} data-testid="input" />
          <div data-testid="output">{value}</div>
        </div>
      );
    };

    render(<TestComponent />);

    const input = screen.getByTestId('input');
    const output = screen.getByTestId('output');

    fireEvent.change(input, { target: { value: 'New Value' } });

    await waitFor(() => {
      expect(output).toHaveTextContent('New Value');
    });
  });

  // Add more tests as needed
});
