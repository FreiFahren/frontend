import React, {  useEffect, useState } from 'react';

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

	// checks if the station input is empty
	const [hasNoStationInput, setHasNoStationInput] = useState<boolean>(false);
	const [defaultLineInputValue, setDefaultLineInputValue] = useState<Option>();
	const [defaultStationInputValue, setDefaultStationInputValue] = useState<Option>();
	const [defaultDirectionInputValue, setDefaultDirectionInputValue] = useState<Option>();

	// these are the options/list on the dropdowns
	const [lineOptions, setLineOptions] = useState<Option[]>([]);
	const [stationOptions, setStationOptions] = useState<Option[]>([]);
	const [directionOptions, setDirectionOptions] = useState<Option[]>([]);

	const [stationsList, setStationsList] = useState<StationsList[]>([]);
	const [linesList, setLinesList] = useState<LinesList[]>([]);

	const [isLoadingLines, setIsLoadingLines] = useState(true);
	const [isLoadingStations, setIsLoadingStations] = useState(true);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		let hasError = false;
 
		if (defaultStationInputValue === '' as unknown as Option) {
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

		
		await reportInspector(defaultLineInputValue!, defaultStationInputValue!, defaultDirectionInputValue!);
		

		closeModal();
		onFormSubmit(); // Notify App component about the submission
	};

	const refreshLineOptions = async () => {
		try {
			setIsLoadingLines(true); // Set loading state to true before fetching data
			const LineOptions: Option[] = [];
			const LinesList: LinesList[] = await getAllLinesList();

			for (const line in LinesList) {
				LineOptions.push({ value: line, label: line });
			}

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
			const StationOptions: Option[] = [];
			const StationsList: StationsList[] = await getAllStationsList();

			for (const station in StationsList) {
				StationOptions.push({
					value: station,
					label: (StationsList[station].name as unknown as string),
				});
			}

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
			setDefaultLineInputValue('' as unknown as Option);
			setDefaultDirectionInputValue('' as unknown as Option);
			setDirectionOptions([]);
			return;
		}

		setDefaultLineInputValue(option);

		// redefine direction list to the first and last station of the selected line
		const newDirectionOptions: Option[] = [];

		const length = (linesList[((option as unknown as Option).value) as unknown as number].length) as unknown as number;
		const firstStation_id = linesList[((option as unknown as Option).value) as unknown as number][0] as unknown as string;
		const lastStation_id = linesList[((option as unknown as Option).value) as unknown as number][length - 1] as unknown as string;

		const firstStation_name = stationsList[firstStation_id as unknown as number].name as unknown as string;
		const lastStation_name = stationsList[lastStation_id as unknown as number].name as unknown as string;

		newDirectionOptions.push({ value: firstStation_id, label: firstStation_name });
		newDirectionOptions.push({ value: lastStation_id, label: lastStation_name });

		setDirectionOptions(newDirectionOptions);

		// redefine station list based on the direction
		const newStationOptions: Option[] = [];

		for(const station_id of linesList[((option).value) as unknown as number] as unknown as string[]){
			newStationOptions.push({ value: station_id, label: stationsList[station_id as unknown as number].name as unknown as string });
		}

		setStationOptions(newStationOptions);

	}

	const handleOnStationChange = (option: Option, action: ActionMeta<unknown>) => {
		if (action.action === 'clear') {
			setDefaultStationInputValue('' as unknown as Option);
			setDefaultLineInputValue('' as unknown as Option);
			setDefaultDirectionInputValue('' as unknown as Option);
			refreshLineOptions();

			return;
		}

		setDefaultStationInputValue(option);

		// redefine lines list to the connections of the selected station
		const newLineOptions: Option[] = [];

		for (const station_id in stationsList) {

			if (option.value === station_id) {
				for (const line of stationsList[station_id].lines as unknown as string[]) {
					newLineOptions.push({ value: line, label: line });

				}
			}
		}

		// if the line is not in the station, reset the line and direction
		let isLineInStation = false;

		for (const line of newLineOptions) {
			if (line.value === defaultLineInputValue?.value) {
				isLineInStation = true;
			}
		}

		if (!isLineInStation) {
			console.log('resetting line and direction')
			setDefaultLineInputValue('' as unknown as Option);
			setDefaultDirectionInputValue('' as unknown as Option);
		}

		setLineOptions(newLineOptions);
	}

	const handleOnDirectionChange = (option: Option, action: ActionMeta<unknown>) => {
		setDefaultDirectionInputValue(option);

	}

	useEffect(() => {
		refreshStationOptions();
		refreshLineOptions();

		console.log(stationsList)
		console.log(linesList)
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
							defaultInputValue={defaultLineInputValue}
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
							defaultInputValue={defaultDirectionInputValue}
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
