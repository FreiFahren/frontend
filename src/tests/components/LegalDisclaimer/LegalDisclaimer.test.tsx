import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from '../../../pages/App/App';
import { highlightElement } from '../../../functions/uiUtils';

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
