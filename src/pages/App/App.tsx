import { useState } from 'react';

import Map from '../../components/Map/Map';
import ReportButton from '../../components/ReportButton/ReportButton';
import ReportForm from '../../components/ReportForm/ReportForm';
import LegalDisclaimer from '../../components/LegalDisclaimer/LegalDisclaimer';
import UtilButton from '../../components/UtilButton/UtilButton';
import UtilModal from '../../components/UtilModal/UtilModal';
import Backdrop from '../../components/Backdrop/Backdrop';
import './App.css';

function App() {
  const [isReportFormOpen, setIsReportFormOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setFormSubmitted(prevState => !prevState);
  }

  const [isUtilFormOpen, setIsUtilFormOpen] = useState(false);

  const [isFirstOpen, setIsFirstOpen] = useState(true);

  const highlightLegalDisclaimer = () => {
    const legalDisclaimer = document.querySelector('.legal-disclaimer');
    if (legalDisclaimer) {
      legalDisclaimer.classList.add('highlight');
      setTimeout(() => {
        legalDisclaimer.classList.remove('highlight');
      }, 3000);
    }
  }

  return (
    <div className='App'>
      {isFirstOpen &&
      <>
        <LegalDisclaimer closeModal={() => setIsFirstOpen(false)} />
        <Backdrop onClick={highlightLegalDisclaimer} />
      </>}
      <div id='map'>
        <Map formSubmitted={formSubmitted} />
      </div>
      <UtilButton onClick={() => setIsUtilFormOpen(!isUtilFormOpen)}/>
      {isUtilFormOpen && (
        <>
          <UtilModal />
          <Backdrop onClick={() => setIsUtilFormOpen(false)} />
        </>
      )}
      <ReportButton onClick={() => setIsReportFormOpen(!isReportFormOpen)} />
      {isReportFormOpen && (
        <>
          <ReportForm closeModal={() => setIsReportFormOpen(false)} onFormSubmit={handleFormSubmit} />
          <Backdrop onClick={() => setIsReportFormOpen(false)} />
        </>
      )}
    </div>
  );
}

export default App;