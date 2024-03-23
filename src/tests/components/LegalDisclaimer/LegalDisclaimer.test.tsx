import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from '../../../pages/App/App';
import { highlightElement } from '../../../functions/uiUtils';

beforeAll(() => {
  // Mocking navigator.permissions if undefined
  if (typeof navigator.permissions === 'undefined') {
    Object.defineProperty(navigator, 'permissions', {
      writable: true,
      value: {},
    });
  }
  // Mocking navigator.permissions.query to return a resolved promise with { state: 'granted' }
  navigator.permissions.query = jest.fn().mockImplementation(() => Promise.resolve({ state: 'granted' }));

  // Checking if navigator.geolocation is undefined and defining it if necessary
  if (typeof navigator.geolocation === 'undefined') {
    Object.defineProperty(navigator, 'geolocation', {
      writable: true,
      value: {},
    });
  }
  // Mocking navigator.geolocation.getCurrentPosition to call the success callback with a mock position
  navigator.geolocation.getCurrentPosition = jest.fn().mockImplementation((successCallback) => {
    const position = { // Mock position object
      coords: {
        latitude: 50.110924,
        longitude: 8.682127,
      },
    };
    successCallback(position);
  });
});

// Mocking highlightElement function
jest.mock('../../../functions/uiUtils', () => ({
  highlightElement: jest.fn(),
}));

describe('LegalDisclaimer Component Tests', () => {
  test('LegalDisclaimer opens', () => {
    render(<App />);
    expect(screen.getByText(/Bitte bestätigen Sie vor dem Fortfahren/)).toBeInTheDocument();
  });

  test('LegalDisclaimer closes when button is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Ich bestätige'));
    expect(screen.queryByText(/Bitte bestätigen Sie vor dem Fortfahren/)).not.toBeInTheDocument();
  });

  test('Highlight works when clicking the backdrop', () => {
    render(<App />);
    // Use getByTestId to select the backdrop
    fireEvent.click(screen.getByTestId('backdrop'));
    // Since highlightElement is mocked, you can check if it was called
    expect(highlightElement).toHaveBeenCalledWith('legal-disclaimer');
  });
});
