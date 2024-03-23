import React from 'react';
import { render, act } from '@testing-library/react';

import { OpacityMarker } from '../../../../../components/Map/Markers/Classes/OpacityMarker/OpacityMarker';

// Mock leaflet's marker to avoid rendering issues in Jest
jest.mock('leaflet', () => ({
  marker: jest.fn().mockReturnValue({
    setIcon: jest.fn(),
    addTo: jest.fn(),
  }),
  icon: jest.fn(),
}));

// Utility function to advance time and apply pending timers
const advanceTime = (ms: number) => act(() => jest.advanceTimersByTime(ms));

describe('OpacityMarker', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('does not enter an infinite loop with changing props', async () => {
    const initialProps = {
      markerData: {
        timestamp: new Date().toISOString(),
        station: {
          id: 'SU-A',
          name: 'Alexanderplatz',
          coordinates: { latitude: 52.52179049999999, longitude: 13.4136147 },
        },
        line: 'S7',
        direction: {
          id: 'S-Ah',
          name: 'Ahrensfelde',
          coordinates: { latitude: 52.57133899999999, longitude: 13.565649 },
        },
        isHistoric: false,
      },
      index: 0,
    };

    const { rerender } = render(<OpacityMarker {...initialProps} />);

    // Simulate props change that would cause re-render
    const newProps = {
        ...initialProps,
        markerData: {
            ...initialProps.markerData,
            direction: {
              id: 'S-PH',
              name: 'Potsdam Hauptbahnhof',
              coordinates: { latitude: 52.39145, longitude: 13.06716 },
            },
        },
    };
    rerender(<OpacityMarker {...newProps} />);

    // Advance time to see if the component settles without exceeding max update depth
    advanceTime(5000);

    // Assertions here would typically check for expected behavior
    // For this test, the primary assertion is that it completes without throwing
    // Hence, if the test completes, it's considered passed for avoiding the infinite loop
  });
});
