import React, { useState } from 'react';

import Map from './components/Map/Map';
import ReportButton from './components/ReportButton/ReportButton';
import ReportForm from './components/ReportForm/ReportForm';
import Backdrop from './components/Backdrop/Backdrop';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='App'>
      <div id='map'>
        <Map />
      </div>
      <ReportButton onClick={() => setIsModalOpen(!isModalOpen)} />
      {isModalOpen && (
        <>
          <Backdrop onClick={() => setIsModalOpen(!isModalOpen)} />
          <ReportForm />
        </>
      )}
    </div>
  );
}

export default App;
