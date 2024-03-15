import React, { useEffect, useState } from 'react';

import Map from './components/Map/Map';
import ReportButton from './components/ReportButton/ReportButton';
import ReportForm from './components/ReportForm/ReportForm';
import UtilButton from './components/UtilButton/UtilButton';
import Backdrop from './components/Backdrop/Backdrop';
import './App.css';

function App() {
  const [isReportFormOpen, setIsReportFormOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setFormSubmitted(prevState => !prevState);
  }

  const [isUtilFormOpen, setIsUtilFormOpen] = useState(false);

  return (
    <div className='App'>
      <div id='map'>
        <Map formSubmitted={formSubmitted} />
      </div>
      <UtilButton onClick={() => setIsUtilFormOpen(!isUtilFormOpen)}/>
      {isUtilFormOpen && (
        <>
          <Backdrop onClick={() => setIsUtilFormOpen(false)} />
        </>
      )}
      <ReportButton onClick={() => setIsReportFormOpen(!isReportFormOpen)} />
      {isReportFormOpen && (
        <>
          <Backdrop onClick={() => setIsReportFormOpen(false)} />
          <ReportForm closeModal={() => setIsReportFormOpen(false)} onFormSubmit={handleFormSubmit} />
        </>
      )}
    </div>
  );
}

export default App;