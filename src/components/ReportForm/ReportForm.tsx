import React, { useEffect, useState } from 'react';

import './ReportForm.css';
import { getAllStationsAndLines, reportInspector } from '../../functions/dbUtils';
import AutocompleteInputForm, { Option } from '../AutocompleteInputForm/AutocompleteInputForm';
import { StationsAndLinesList } from '../../functions/dbUtils';
import { highlightElement } from '../../functions/uiUtils';

interface ReportFormProps {
	closeModal: () => void;
	onFormSubmit: () => void;
}
interface StationProperty {
	name: string;
	coordinates: {
	  latitude: number;
	  longitude: number;
	};
	lines: string[];
  }

// const ReportForm: React.FC<ReportFormProps> = ({
// 	closeModal,
// 	onFormSubmit,
// }) => {
// 	const [line, setLine] = useState('');
// 	const [station, setStation] = useState('');
// 	const [direction, setDirection] = useState('');

// 	const handleSubmit = async (event: React.FormEvent) => {
// 		event.preventDefault();
// 		console.log(line, station, direction);

// 		if (station === '' || line === '' || direction === '') {
// 			alert('Bitte füllen Sie alle Felder aus');
// 			return;
// 		}
// 		await reportInspector((line as unknown as Option).label, (station as unknown as Option).value, (direction as unknown as Option).value);

// 		closeModal();
// 		onFormSubmit(); // Notify App component about the submission
// 	};

// 	const lines: Option[] = [];
// 	const stations: Option[] = [];

// 	const fetchStationsAndLines = async () => {
// 		const StationsAndLinesList: StationsAndLinesList =
// 			await getAllStationsAndLines();
// 		const lineKeys = Object.keys(StationsAndLinesList.lines[0]);
// 		console.log(StationsAndLinesList);
// 		for (const key of lineKeys) {
// 			lines.push({ value: key, label: key });
// 		}
		
		
		

// 		Object.entries(StationsAndLinesList.stations).forEach(([key, stationProperty]) => {
// 			// what the fuck typescript, wtf is this and why unknwon??
// 			stations.push({ value: key, label: (stationProperty as unknown as StationProperty).name });
			
// 		});
// 	};

// 	useEffect(() => {
// 		fetchStationsAndLines();
// 	});

// 	return (
// 		<div className="report-form container">
// 			<h1>Neue Meldung</h1>
// 			<form onSubmit={handleSubmit}>
// 				<AutocompleteInputForm
// 					className="line"
// 					options={lines}
// 					placeholder="Linie"
// 					onChange={(value) => setLine(value)}
// 				/>
// 				<AutocompleteInputForm
// 					className="station"
// 					options={stations}
// 					placeholder="Station"
// 					onChange={(value) => setStation(value)}
// 				/>
// 				<AutocompleteInputForm
// 					className="direction"
// 					options={stations}
// 					placeholder="Richtung"
// 					onChange={(value) => setDirection(value)}
// 				/>

// 				<button type="submit">Melden</button>
// 			</form>
// 		</div>
// 	);
// }

const ReportForm: React.FC<ReportFormProps> = ({ closeModal, onFormSubmit }) => {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const line = (document.getElementById('line') as HTMLInputElement).value;
    const station = (document.getElementById('station') as HTMLInputElement).value;
    const direction = (document.getElementById('direction') as HTMLInputElement).value;

    let hasError = false;

    if (station.trim() === '') {
      highlightElement('station'); // Highlight the 'station' input field
      hasError = true;
    }

    if (!(document.getElementById('privacy-checkbox') as HTMLInputElement).checked) {
      highlightElement('privacy-label'); // Highlight the 'privacy-checkbox' input field
      hasError = true;
    }

    if (hasError) return; // If there is an error, do not proceed with the submission

    await reportInspector(line, station, direction);

    closeModal();
    onFormSubmit(); // Notify App component about the submission
  };

  return (
    <div className='report-form container'>
      <h1>Neue Meldung</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input type='text' id='line' name='line' placeholder='Linie' />
        </div>
        <div>
          <input
            type='text'
            id='station'
            name='station'
            onFocus={() => (document.getElementById('custom-placeholder') as HTMLElement).style.display = 'none'}
            onBlur={(e) => { if (e.target.value === '') (document.getElementById('custom-placeholder') as HTMLElement).style.display = 'inline'}}
          />
          <div id='custom-placeholder' className='custom-placeholder'>
            <span>Station</span>
            <span className='red-highlight'>*</span>
          </div>
        </div>
        <div>
          <input
            type='text'
            id='direction'
            name='direction'
            placeholder='Richtung'
          />
        </div>
        <div>
          <label htmlFor='privacy-checkbox' id='privacy-label'>
            <input type='checkbox' id='privacy-checkbox' name='privacy-checkbox'/>
            Ich stimme der <a href='/datenschutz'> Datenschutzerklärung </a> zu. <span className='red-highlight'>*</span>
          </label>
        </div>
        <div>
          <button type='submit'>Melden</button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
