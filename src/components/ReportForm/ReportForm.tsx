import React, { useEffect, useState } from 'react';

import './ReportForm.css';
import {

	LinesList,
	StationList,
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

	// checks if the station input is empty
	const [hasNoStationInput, setHasNoStationInput] = useState<boolean>(false);

	const [lineInput, setLineInput] = useState<Option>();
	const [stationInput, setStationInput] = useState<Option>();
	const [directionInput, setDirectionInput] = useState<Option>();

	// these are the options/list on the dropdowns
	const [lineOptions, setLineOptions] = useState<Option[]>([]);
	const [stationOptions, setStationOptions] = useState<Option[]>([]);
	const [directionOptions, setDirectionOptions] = useState<Option[]>([]);

	const [stationsList, setStationsList] = useState<StationList>({});
	const [linesList, setLinesList] = useState<LinesList>({});

	const [isLoadingLines, setIsLoadingLines] = useState(true);
	const [isLoadingStations, setIsLoadingStations] = useState(true);

	const emptyOption = '' as unknown as Option;

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		let hasError = false;

		if (stationInput === emptyOption) {
			highlightElement('station'); // Highlight the 'station' input field
			setHasNoStationInput(true);
			hasError = true;
		} else {
			setHasNoStationInput(false);
			hasError = false;
		}

		if (
			!(document.getElementById('privacy-checkbox') as HTMLInputElement)
				.checked
		) {
			highlightElement('privacy-label'); // Highlight the 'privacy-checkbox' input field
			hasError = true;
		}

		if (hasError) return; // If there is an error, do not proceed with the submission

		await reportInspector(lineInput!, stationInput!, directionInput!);

		closeModal();
		onFormSubmit(); // Notify App component about the submission
	};

	const refreshLineOptions = async () => {
		try {
			setIsLoadingLines(true); // Set loading state to true before fetching data
			const LinesList: LinesList = await getAllLinesList();
			const LineOptions = Object.keys(LinesList).map(line => ({ value: line, label: line }));

			setLinesList(LinesList);
			setLineOptions(LineOptions);

			return LinesList
		} catch (error) {
			console.error('Failed to fetch lines:', error);
		} finally {
			setIsLoadingLines(false); // Set loading state to false after fetching data

		}
	}

	const refreshStationOptions = async () => {
		try {
			setIsLoadingStations(true); // Set loading state to true before fetching data
			
			const StationsList: StationList = await getAllStationsList();
			const StationOptions = Object.keys(StationsList).map(station => ({ value: station, label: StationsList[station].name }));

			setStationsList(StationsList);
			setStationOptions(StationOptions);
		} catch (error) {
			console.error('Failed to fetch stations and lines:', error);
		} finally {
			setIsLoadingStations(false); // Set loading state to false after fetching data
		}
	};

	const handleOnLineChange = (option: Option, action: ActionMeta<unknown>) => {
		if (action.action === 'clear') {
			setLineInput(emptyOption);
			setDirectionInput(emptyOption);
			setDirectionOptions([]);
			refreshStationOptions();
			return;
		}

		setLineInput(option);

		// redefine direction list to the first and last station of the selected line
		const newDirectionOptions: Option[] = [];

		const length = linesList[option.value].length;
		const firstStation_id = linesList[option.value][0];
		const lastStation_id = linesList[option.value][length - 1];

		const firstStation_name = stationsList[firstStation_id].name;
		const lastStation_name = stationsList[lastStation_id].name;

		newDirectionOptions.push({ value: firstStation_id, label: firstStation_name }, { value: lastStation_id, label: lastStation_name });

		setDirectionOptions(newDirectionOptions);

		// redefine station list based on the direction
		const newStationOptions: Option[] = [];

		for (const station_id of linesList[option.value]) {
			newStationOptions.push({ value: station_id, label: stationsList[station_id ].name });
		}
		

		setStationOptions(newStationOptions);

	}

	const handleOnStationChange = (option: Option, action: ActionMeta<unknown>) => {
		if (action.action === 'clear') {
			setStationInput(emptyOption);
			setLineInput(emptyOption);
			setDirectionInput(emptyOption);
			refreshLineOptions();
			refreshStationOptions();

			return;
		}

		setStationInput(option);

		// redefine lines list to the connections of the selected station
		const newLineOptions: Option[] = [];

		for (const station_id in stationsList) {

			if (option.value === station_id) {
				for (const line of stationsList[station_id].lines) {
					newLineOptions.push({ value: line, label: line });

				}
			}
		}

		setLineOptions(newLineOptions);
	}

	const handleOnDirectionChange = (option: Option) => {
		setDirectionInput(option);

	}

	useEffect(() => {
		refreshStationOptions();
		refreshLineOptions();

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
						defaultInputValue={stationInput}
						hasNoStationInput={hasNoStationInput}
						onChange={handleOnStationChange as (value: unknown, action: ActionMeta<unknown>) => void}
						isLoading={isLoadingStations}
						isDisabled={isLoadingStations}
					/>

				</div>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div style={{ width: '35%' }}>
						<AutocompleteInputForm
							className='line-select'
							options={lineOptions}
							defaultInputValue={lineInput}
							placeholder='Linie'
							onChange={handleOnLineChange as (option: unknown, action: ActionMeta<unknown>) => void}
							isDropdownIndicator={false}
							isIndicatorSeparator={false}
							isLoading={isLoadingLines}
							isDisabled={isLoadingLines}
						/>
					</div>
					<div style={{ width: '65%' }}>
						<AutocompleteInputForm
							className='direction-select'
							options={directionOptions}
							placeholder='Richtung'
							defaultInputValue={directionInput}
							onChange={handleOnDirectionChange as (option: unknown, action: ActionMeta<unknown>) => void}
							isDropdownIndicator={false}
							isIndicatorSeparator={false}
							isLoading={isLoadingStations}
							isDisabled={isLoadingStations}
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
