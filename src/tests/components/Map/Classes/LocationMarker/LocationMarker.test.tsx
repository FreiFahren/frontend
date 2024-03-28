// FILEPATH: /Users/david/Documents/GitHub/frontend/src/tests/components/Map/Markers/Classes/LocationMarker/LocationMarker.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import LocationMarker from '../../../../../components/Map/Markers/Classes/LocationMarker/LocationMarker';
import { createLocationMarkerHTML } from '../../../../../functions/mapUtils';
import { watchPosition } from '../../../../../functions/mapUtils';

jest.mock('react-leaflet', () => ({
  Marker: jest.fn(() => null),
  Popup: jest.fn(() => null),
}));

jest.mock('../../../../../functions/mapUtils', () => ({
    watchPosition: jest.fn(),
    createLocationMarkerHTML: jest.fn(),
}));

describe('LocationMarker', () => {
  const setUserPosition = jest.fn();
  const userPosition: LatLngTuple = [52.5162, 13.3880];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Marker when userPosition is provided', () => {
    render(<LocationMarker userPosition={userPosition} setUserPosition={setUserPosition} />);
    expect(Marker).toHaveBeenCalledWith(
      expect.objectContaining({
        position: userPosition,
      }),
      expect.anything()
    );
  });

  it('does not render Marker when userPosition is null', () => {
    render(<LocationMarker userPosition={null} setUserPosition={setUserPosition} />);
    expect(Marker).not.toHaveBeenCalled();
  });

  it('calls watchPosition on mount', async () => {
    (watchPosition as jest.Mock).mockResolvedValue(jest.fn());
  
    render(<LocationMarker userPosition={userPosition} setUserPosition={setUserPosition} />);
    expect(watchPosition).toHaveBeenCalledWith(setUserPosition); // This will cause the test to fail
  });


});