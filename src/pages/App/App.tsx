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

export type ThemeLayerOptions = 'Light' | 'Dark';

export const LayerContext = React.createContext({
  currentThemeLayer: 'Light',
  setCurrentThemeLayer: (layer: string) => {console.log(layer)},
});

type AppUIState = {
  isReportFormOpen: boolean;
  isUtilFormOpen: boolean;
  isFirstOpen: boolean;
  formSubmitted: boolean;
};

const initialAppUIState: AppUIState = {
  isReportFormOpen: false,
  isUtilFormOpen: false,
  isFirstOpen: true,
  formSubmitted: false,
};

function App() {
  const [appUIState, setAppUIState] = useState<AppUIState>(initialAppUIState);
  const [currentThemeLayer, setCurrentThemeLayer] = useState('Light');

  const [initialPosition, setInitialPosition] = useState<LatLngTuple | null>(null);

  const handleFormSubmit = () => {
    setAppUIState(appUIState => ({ ...appUIState, formSubmitted: !appUIState.formSubmitted }));
  }

  async function closeLegalDisclaimer() {
    setAppUIState({ ...appUIState, isFirstOpen: false });
    const position = await getPosition();

    if (position) {
      setInitialPosition(position);
    }
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
      <LayerContext.Provider value={{ currentThemeLayer, setCurrentThemeLayer }}>
        <Map formSubmitted={appUIState.formSubmitted} initialPosition={initialPosition} />
        <UtilButton onClick={() => setAppUIState({ ...appUIState, isUtilFormOpen: !appUIState.isUtilFormOpen })} />

        {appUIState.isUtilFormOpen && (
          <>
            <UtilModal className={ (currentThemeLayer === 'Light') ? 'open' : 'open dark-mode'} />
            <Backdrop onClick={() => setAppUIState({ ...appUIState, isUtilFormOpen: false })} />
          </>
        )}
        <ReportButton onClick={() => setAppUIState({ ...appUIState, isReportFormOpen: !appUIState.isReportFormOpen })} />
      </LayerContext.Provider>
      {appUIState.isReportFormOpen && (
        <>
          <ReportForm
            closeModal={() => setAppUIState({ ...appUIState, isReportFormOpen: false })}
            onFormSubmit={handleFormSubmit}
            className={'open'}
          />
          <Backdrop onClick={() => setAppUIState({ ...appUIState, isReportFormOpen: false })} />
        </>
      )}
    </div>
  );
}

export default App;