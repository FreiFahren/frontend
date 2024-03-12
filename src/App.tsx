import React, { useState } from 'react';

import Map from './components/Map';
import ReportButton from './components/ReportButton/ReportButton';
import ReportForm from './components/ReportForm/ReportForm';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <div className="App">
      <div id="map">
        <Map />
      </div>
      {isModalOpen && <ReportForm />}
      <ReportButton onClick={() => setIsModalOpen(!isModalOpen)} />
    </div>
  );
}

export default App;
