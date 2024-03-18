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

const ReportForm: React.FC<ReportFormProps> = ({
	closeModal,
	onFormSubmit,
}) => {
	const [line, setLine] = useState<{ value: string, label: string }>({ value: '', label: '' });
	const [station, setStation] = useState<{ value: string, label: string }>({ value: '', label: '' });
	const [direction, setDirection] = useState<{ value: string, label: string }>({ value: '', label: '' });
	const [hasNoStationInput, setHasNoStationInput] = useState(false);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		let hasError = false;

		if (station.label.trim() === '') {
			highlightElement('station'); // Highlight the 'station' input field
			setHasNoStationInput(true);
			hasError = true;
		}else{
			setHasNoStationInput(false);
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

	const lines: Option[] = [];
	const stations: Option[] = [];

	const fetchStationsAndLines = async () => {
		const StationsAndLinesList: StationsAndLinesList =
			await getAllStationsAndLines();
		const lineKeys = Object.keys(StationsAndLinesList.lines[0]);
		console.log(StationsAndLinesList);
		for (const key of lineKeys) {
			lines.push({ value: key, label: key });
		}

		Object.entries(StationsAndLinesList.stations).forEach(([key, stationProperty]) => {
			// what the fuck typescript, wtf is this and why unknwon??
			stations.push({ value: key, label: (stationProperty as unknown as StationProperty).name });

		});
	};

	useEffect(() => {
		fetchStationsAndLines();
	});

	return (
		<div className='report-form container'>
			<h1>Neue Meldung</h1>
			<form onSubmit={handleSubmit}>
				<AutocompleteInputForm
					className='line-select'
					options={lines}
					placeholder='Linie'
					onChange={(value) => setLine(value as unknown as Option)}
				/>
				<div>
					<AutocompleteInputForm
						className='station-select'
						options={stations}
						placeholder='Station'
						hasNoStationInput={hasNoStationInput}
						onChange={(value) => setStation(value as unknown as Option)}
					/>
				</div>
				<div>
					<AutocompleteInputForm
						className='direction-select'
						options={stations}
						placeholder='Richtung'
						onChange={(value) => setDirection(value as unknown as Option)}
					/>
				</div>
				<div>
					<label htmlFor='privacy-checkbox' id='privacy-label'>
						<input
							type='checkbox'
							id='privacy-checkbox'
							name='privacy-checkbox'
						/>
						Ich stimme der{' '}
						<a href='/datenschutz'> Datenschutzerklärung </a> zu.{' '}
						<span className='red-highlight'>*</span>
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
