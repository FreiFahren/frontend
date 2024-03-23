import React from 'react';
import { render } from '@testing-library/react';
import Map from '../../../components/Map/Map';
import { MapContainer } from 'react-leaflet';

// Mock the MapContainer and any other components from react-leaflet you use
jest.mock('react-leaflet', () => ({
  MapContainer: jest.fn(() => null),
  TileLayer: jest.fn(() => null),
  Marker: jest.fn(() => null), // Mock Marker if you use it
  // Add any other components you need to mock here
}));

describe('Map', () => {
  it('renders MapContainer with the correct initial position', () => {
    render(<Map formSubmitted={false} />);
    expect(MapContainer).toHaveBeenCalledWith(
      expect.objectContaining({
        center: [52.5162, 13.3880],
        zoom: 13,
      }),
      expect.anything() // This is because the rest of the props are not important for this test
    );
  });

  // Add more tests here to cover other functionalities and props variations
});
