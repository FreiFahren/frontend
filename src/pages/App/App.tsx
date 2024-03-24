import React, { useState } from 'react';
import { LatLngTuple } from 'leaflet';

import Map from '../../components/Map/Map';

import ReportButton from '../../components/ReportButton/ReportButton';
import ReportForm from '../../components/ReportForm/ReportForm';
import UtilButton from '../../components/UtilButton/UtilButton';

import LegalDisclaimer from '../../components/LegalDisclaimer/LegalDisclaimer';
import UtilModal from '../../components/UtilModal/UtilModal';

import { highlightElement } from '../../functions/uiUtils';
import Backdrop from '../../components/Backdrop/Backdrop';
import { getPosition } from '../../components/Map/Markers/Classes/LocationMarker/LocationMarker';

import './App.css';

function App() {
  const [isReportFormOpen, setIsReportFormOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setFormSubmitted(prevState => !prevState);
  }

  const [isUtilFormOpen, setIsUtilFormOpen] = useState(false);

  const [isFirstOpen, setIsFirstOpen] = useState(true);

  const [initialPosition, setInitialPosition] = useState<LatLngTuple | null>(null);

  async function closeLegalDisclaimer() {
    setIsFirstOpen(false);
    const position = await getPosition();

    if (position) {
      setInitialPosition(position);
    }
  }

  return (
    <div className='App'>
      {isFirstOpen &&
      <>
        <LegalDisclaimer
          className={isFirstOpen ? 'open' : ''}
          closeModal={closeLegalDisclaimer}
        />
        <Backdrop onClick={() => highlightElement('legal-disclaimer')} />
      </>}

      <Map formSubmitted={formSubmitted} initialPosition={initialPosition}/>
      <UtilButton onClick={() => setIsUtilFormOpen(!isUtilFormOpen)}/>

      {isUtilFormOpen && (
        <>
          <UtilModal className={'open'}/>
          <Backdrop onClick={() => setIsUtilFormOpen(false)} />
        </>
      )}
      <ReportButton onClick={() => setIsReportFormOpen(!isReportFormOpen)} />

      {isReportFormOpen && (
        <>
          <ReportForm
            closeModal={() => setIsReportFormOpen(false)}
            onFormSubmit={handleFormSubmit}
            className={'open'}
          />
          <Backdrop onClick={() => setIsReportFormOpen(false)} />
        </>
      )}
    </div>
  );
}

export default App;