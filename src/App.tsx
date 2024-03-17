import React, { useEffect, useState } from 'react';

import Map from './components/Map/Map';
import ReportButton from './components/ReportButton/ReportButton';
import ReportForm from './components/ReportForm/ReportForm';
import LegalDisclaimer from './components/LegalDisclaimer/LegalDisclaimer';
import Backdrop from './components/Backdrop/Backdrop';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setFormSubmitted(prevState => !prevState);
  }

  const [isFirstOpen, setIsFirstOpen] = useState(true);

  return (
    <div className='App'>
      {isFirstOpen && <LegalDisclaimer closeModal={() => setIsFirstOpen(false)} />}
      <div id='map'>
        <Map formSubmitted={formSubmitted} />
      </div>
      <ReportButton onClick={() => setIsModalOpen(!isModalOpen)} />
      {isModalOpen && (
        <>
          <Backdrop onClick={() => setIsModalOpen(false)} />
          <ReportForm closeModal={() => setIsModalOpen(false)} onFormSubmit={handleFormSubmit} />
        </>
      )}
    </div>
  );
}

export default App;