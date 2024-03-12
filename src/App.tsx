import React from 'react';

import Map from './components/Map';
import ReportButton from './components/report-button/report-button';
import './App.css';

function App() {
  return (
    <div className="App">
      <ReportButton />
      <Map />
    </div>
  );
}

export default App;
