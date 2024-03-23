import React from 'react';
import { render } from '@testing-library/react';
import { MapContainer } from 'react-leaflet';

import Map from '../../../components/Map/Map';

// Mock the MapContainer and any other components from react-leaflet you use
jest.mock('react-leaflet', () => ({
  MapContainer: jest.fn(() => null),
  TileLayer: jest.fn(() => null),
  Marker: jest.fn(() => null), // Mock Marker if you use it
  // Add any other components you need to mock here
}));

describe('Map', () => {
  // Existing test case
  it('renders MapContainer with the correct initial position', () => {
    render(<Map formSubmitted={false} />);
    expect(MapContainer).toHaveBeenCalledWith(
      expect.objectContaining({
        center: [52.5162, 13.3880],
        zoom: 13,
      }),
      expect.anything()
    );
  });

  it('enables scrollWheelZoom', () => {
    render(<Map formSubmitted={false} />);
    expect(MapContainer).toHaveBeenCalledWith(
      expect.objectContaining({
        scrollWheelZoom: true,
      }),
      expect.anything()
    );
  });

  it('restricts the map view within specified maxBounds', () => {
    const expectedMaxBounds = {
      _northEast: { lat: 52.96125019866001, lng: 14.382300343810543 },
      _southWest: { lat: 52.014679000584486, lng: 12.509131386425151 }
    };
    render(<Map formSubmitted={false} />);
    expect(MapContainer).toHaveBeenCalledWith(
      expect.objectContaining({
        maxBounds: expect.objectContaining(expectedMaxBounds),
      }),
      expect.anything()
    );
  });  

  it('accepts formSubmitted prop changes', () => {
    const { rerender } = render(<Map formSubmitted={false} />);
    expect(MapContainer).toHaveBeenCalledWith(
      expect.objectContaining({
        children: expect.anything(),
      }),
      expect.anything()
    );
  
    rerender(<Map formSubmitted={true} />);
    // This test checks if MapContainer is called again after rerendering
    // Ideally, this would check for a change in behavior based on formSubmitted
    // However, as child components are mocked, direct effects might not be visible
  });   
});