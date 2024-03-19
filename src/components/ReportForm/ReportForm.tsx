import React, { useCallback, useEffect, useState } from 'react';

import './ReportForm.css';
import {
	LinesList,
	StationsList,
	getAllLinesList,
	getAllStationsList,
	reportInspector,
} from '../../functions/dbUtils';
import AutocompleteInputForm, {
	Option,
} from '../AutocompleteInputForm/AutocompleteInputForm';
import { highlightElement } from '../../functions/uiUtils';
import { ActionMeta } from 'react-select/';

interface ReportFormProps {
	closeModal: () => void;
	onFormSubmit: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({
	closeModal,
	onFormSubmit,
}) => {
	// these are the values from the dropdowns, that are getting posted to api
	const [linePOST, setLinePOST] = useState<{ value: string; label: string }>({
		value: '',
		label: '',
	});
	const [stationPOST, setStationPOST] = useState<{
		value: string;
		label: string;
	}>({ value: '', label: '' });
	const [directionPOST, setDirectionPOST] = useState<{
		value: string;
		label: string;
	}>({ value: '', label: '' });

	// checks if the station input is empty
	const [hasNoStationInput, setHasNoStationInput] = useState(false);
	const [defaultLineInputValue, setDefaultLineInputValue] = useState('');
	const [defaultStationInputValue, setDefaultStationInputValue] = useState('');
	const [defaultDirectionInputValue, setDefaultDirectionInputValue] = useState('');

	// these are the options/list on the dropdowns
	const [lineOptions, setLineOptions] = useState<Option[]>([]);
	const [stationOptions, setStationOptions] = useState<Option[]>([]);
	const [directionOptions, setDirectionOptions] = useState<Option[]>([]);

	const [stationsList, setStationsList] = useState<StationsList[]>([]);
	const [linesList, setLinesList] = useState<LinesList[]>([]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		let hasError = false;

		if (stationPOST.label.trim() === '') {
			highlightElement('station'); // Highlight the 'station' input field
			setHasNoStationInput(true);
			hasError = true;
		} else {
			setHasNoStationInput(false);
		}

		if (
			!(document.getElementById('privacy-checkbox') as HTMLInputElement)
				.checked
		) {
			highlightElement('privacy-label'); // Highlight the 'privacy-checkbox' input field
			hasError = true;
		}

		if (hasError) return; // If there is an error, do not proceed with the submission

		await reportInspector(linePOST, stationPOST, directionPOST);

		closeModal();
		onFormSubmit(); // Notify App component about the submission
	};

	const fetchStationsAndLines = async () => {
		try {
			let LineOptions: Option[] = [];
			let StationOptions: Option[] = [];

			const StationsList: StationsList[] = await getAllStationsList();
			const LinesList: LinesList[] = await getAllLinesList();

			for (const line in LinesList) {
				LineOptions.push({ value: line, label: line });
			}
			
			for (const station in StationsList) {
				StationOptions.push({
					value: station,
					label: (StationsList[station].name as unknown as string),
				});
			}

			// here, we set the list of stations and lines (for later use)
			setStationsList(StationsList);
			setLinesList(LinesList);

			// these are the dropdown options
			setLineOptions(LineOptions);
			setStationOptions(StationOptions);


		} catch (error) {
			console.error('Failed to fetch stations and lines:', error);
		
		}
	};

	const handleOnLineChange = useCallback((value: unknown, action: ActionMeta<unknown>) => {
			setDefaultLineInputValue(value as string);

			if (action.action === 'clear') {
				setDefaultLineInputValue('');
				return;
			}
			
		},
		[]
	);

	const handleOnStationChange = useCallback((value: unknown, action: ActionMeta<unknown>) => {
			setDefaultStationInputValue(value as string);
			console.log(defaultLineInputValue)
			if (defaultLineInputValue !== '') {
				for (const station in stationsList) {
					console.log(station);
				}
			}
		},
		[]
	);

	const handleOnDirectionChange = useCallback(
		(value: unknown, action: ActionMeta<unknown>) => {
			setDirectionPOST(value as Option);

			if (value === null) {
				setDirectionOptions([]);
				setDefaultDirectionInputValue('');
				if (action.action === 'clear') {
					fetchStationsAndLines();
					setDefaultLineInputValue('');
					setDefaultStationInputValue('');
				}
				return;
			}
			setDefaultDirectionInputValue(value as string);
		},
		[]
	);

	useEffect(() => {
		fetchStationsAndLines();
	}, []);

	return (
		<div className='report-form container'>
			<h1>Neue Meldung</h1>
			<form onSubmit={handleSubmit}>
				
				<div>
					<AutocompleteInputForm
						className='station-select'
						options={stationOptions}
						placeholder='Station'
						defaultInputValue={defaultStationInputValue}
						hasNoStationInput={hasNoStationInput}
						onChange={handleOnStationChange}
					/>

				</div>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div style={{ width: '40%' }}>
					<AutocompleteInputForm
						className='line-select'
						options={lineOptions}
						defaultInputValue={defaultLineInputValue}
						placeholder='Linie'
						onChange={handleOnLineChange}
						isDropdownIndicator={false}
						isIndicatorSeparator={false}
					/>
				</div>
				<div style={{ width: '60%' }}>
					<AutocompleteInputForm
						className='direction-select'
						options={directionOptions}
						placeholder='Richtung'
						defaultInputValue={defaultDirectionInputValue}
						onChange={handleOnDirectionChange}
						isDropdownIndicator={false}
						isIndicatorSeparator={false}
					/>
				</div>
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
