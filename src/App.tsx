import React from 'react';

import Map from './components/Map/Map';
import ReportButton from './components/report-button/report-button';
import './App.css';

function App() {
  return (
    <div className='App'>
      <div id='map'>
        <Map />
      </div>
      <ReportButton />
    </div>
  );
}

export default App;
