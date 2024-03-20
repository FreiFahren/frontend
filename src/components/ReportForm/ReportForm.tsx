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
	const [linePOST, setLinePOST] = useState<Option>({
		value: '',
		label: '',
	});
	const [stationPOST, setStationPOST] = useState<Option>({ value: '', label: '' });
	const [directionPOST, setDirectionPOST] = useState<Option>({ value: '', label: '' });

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

	const [isLoadingLines, setIsLoadingLines] = useState(true);
	const [isLoadingStations, setIsLoadingStations] = useState(true);


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

	const refreshLineOptions = async () => {
		try {
			setIsLoadingLines(true); // Set loading state to true before fetching data
			let LineOptions: Option[] = [];
			const LinesList: LinesList[] = await getAllLinesList();
			
			for (const line in LinesList) {
				LineOptions.push({ value: line, label: line });
			}
			
			setLinesList(LinesList);
			setLineOptions(LineOptions);

			console.log(LineOptions)
		} catch (error) {
			console.error('Failed to fetch lines:', error);
		} finally {
			setIsLoadingLines(false); // Set loading state to false after fetching data
			console.log('lines:', linesList);
		}
	}
	
	const refreshStationOptions = async () => {
		try {
			setIsLoadingStations(true); // Set loading state to true before fetching data
			let StationOptions: Option[] = [];
			const StationsList: StationsList[] = await getAllStationsList();
			
			refreshLineOptions();	
			
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

	const handleOnLineChange = useCallback((value: unknown, action: ActionMeta<unknown>) => {
			if (action.action === 'clear') {
				setDefaultLineInputValue('');
				setDefaultDirectionInputValue('');
				return;
			}

			setDefaultLineInputValue(value as string);

			if(defaultDirectionInputValue !== '') {
				setDefaultDirectionInputValue('');
			}


			// redefine direction list to the first and last station of the selected line
			let newDirectionOptions: Option[] = [];


			if (linesList.length !== 0) {
				const length = (linesList[((value as unknown as Option).value) as unknown as number].length) as unknown as number;
				const firstStation_id = linesList[((value as unknown as Option).value) as unknown as number][0] as unknown as string;
				const lastStation_id = linesList[((value as unknown as Option).value) as unknown as number][length - 1] as unknown as string;

				const firstStation_name = stationsList[firstStation_id as unknown as number].name as unknown as string;
				const lastStation_name = stationsList[lastStation_id as unknown as number].name as unknown as string;

				newDirectionOptions.push({ value: firstStation_id, label: firstStation_name });
				newDirectionOptions.push({ value: lastStation_id, label: lastStation_name });
				
				setDirectionOptions(newDirectionOptions);
			}else {
				let newLineOptions: Option[] = [];

				for (const station in stationsList) {
					if ((value as unknown as Option).value === station ) {
						for (const line of stationsList[station].lines as unknown as string[]) {
							newLineOptions.push({ value: line, label: line });
							
						}
					}
				}
			}
			
		
		},
		[]
	);

	const handleOnStationChange = (value: unknown, action: ActionMeta<unknown>) => {
			if(action.action === 'clear') {
				setDefaultStationInputValue('');
				refreshLineOptions();
				return;
			}

			setDefaultStationInputValue(value as string);

			// redefine lines list to the connections of the selected station
			let newLineOptions: Option[] = [];

			for (const station in stationsList) {
				if ((value as unknown as Option).value === station ) {
					for (const line of stationsList[station].lines as unknown as string[]) {
						newLineOptions.push({ value: line, label: line });
						
					}
				}
			}

			// if the line is not in the station, reset the line and direction
			let isLineInStation = false;

			for(const line of newLineOptions) {
				if (line.value === (defaultLineInputValue as unknown as Option).value) {
					isLineInStation = true;
				}
			}

			if (!isLineInStation) {
				setDefaultLineInputValue('');
				setDefaultDirectionInputValue('');
			}


			setLineOptions(newLineOptions);
		}

	const handleOnDirectionChange = useCallback(
		(value: unknown, action: ActionMeta<unknown>) => {
			setDirectionPOST(value as Option);

			if (value === null) {
				setDirectionOptions([]);
				setDefaultDirectionInputValue('');
				if (action.action === 'clear') {
					refreshStationOptions();
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
						defaultInputValue={defaultStationInputValue}
						hasNoStationInput={hasNoStationInput}
						onChange={handleOnStationChange}
						isLoading={isLoadingStations}
						isDisabled={isLoadingStations}
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
						isLoading={isLoadingLines}
						isDisabled={isLoadingLines}
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
						isDisabled={directionOptions.length === 0}

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
