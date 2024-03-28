import React, { useState } from 'react';

import Map from '../../components/Map/Map';
import ReportButton from '../../components/ReportButton/ReportButton';
import ReportForm from '../../components/ReportForm/ReportForm';
import LegalDisclaimer from '../../components/LegalDisclaimer/LegalDisclaimer';
import UtilButton from '../../components/UtilButton/UtilButton';
import UtilModal from '../../components/UtilModal/UtilModal';
import { highlightElement } from '../../functions/uiUtils';

import Backdrop from '../../components/Backdrop/Backdrop';
import './App.css';
import { LatLngTuple } from 'leaflet';

type AppUIState = {
  isReportFormOpen: boolean;
  formSubmitted: boolean;
  isUtilFormOpen: boolean;
  isFirstOpen: boolean;
};

const initialAppUIState: AppUIState = {
  isReportFormOpen: false,
  formSubmitted: false,
  isUtilFormOpen: false,
  isFirstOpen: true,
};

function App() {
  const [appUIState, setAppUIState] = useState<AppUIState>(initialAppUIState);
  const [userPosition, setUserPosition] = useState<LatLngTuple | null>(null);

  const handleFormSubmit = () => {
    setAppUIState(appUIState => ({ ...appUIState, formSubmitted: !appUIState.formSubmitted }));
  }

  async function closeLegalDisclaimer() {
    setAppUIState({ ...appUIState, isFirstOpen: false });
  }

  return (
    <div className='App'>
      {appUIState.isFirstOpen &&
        <>
          <LegalDisclaimer
            className={appUIState.isFirstOpen ? 'open' : ''}
            closeModal={closeLegalDisclaimer}
          />
          <Backdrop onClick={() => highlightElement('legal-disclaimer')} />
        </>}
        <Map formSubmitted={appUIState.formSubmitted} userPosition={userPosition} setUserPosition={setUserPosition} />
        <UtilButton onClick={() => setAppUIState({ ...appUIState, isUtilFormOpen: !appUIState.isUtilFormOpen })} />

        {appUIState.isUtilFormOpen && (
          <>
            <UtilModal className={ 'open' } />
            <Backdrop onClick={() => setAppUIState({ ...appUIState, isUtilFormOpen: false })} />
          </>
        )}
        <ReportButton onClick={() => setAppUIState({ ...appUIState, isReportFormOpen: !appUIState.isReportFormOpen })} />
      {appUIState.isReportFormOpen && (
        <>
          <ReportForm
            closeModal={() => setAppUIState({ ...appUIState, isReportFormOpen: false })}
            onFormSubmit={handleFormSubmit}
            className={'open'}
            userPosition={userPosition}
          />
          <Backdrop onClick={() => setAppUIState({ ...appUIState, isReportFormOpen: false })} />
        </>
      )}
    </div>
  );
}

export default App;