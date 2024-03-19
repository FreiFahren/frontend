import React, { useEffect, useState } from 'react';

import './ReportForm.css';
import { getAllStationsAndLines, reportInspector } from '../../functions/dbUtils';
import AutocompleteInputForm, { Option } from '../AutocompleteInputForm/AutocompleteInputForm';
import { StationsAndLinesList } from '../../functions/dbUtils';
import { highlightElement } from '../../functions/uiUtils';
import { ActionMeta } from 'react-select/';

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
	// these are the values from the dropdowns, that are getting posted to api
	const [linePOST, setLinePOST] = useState<{ value: string, label: string }>({ value: '', label: '' });
	const [stationPOST, setStationPOST] = useState<{ value: string, label: string }>({ value: '', label: '' });
	const [directionPOST, setDirectionPOST] = useState<{ value: string, label: string }>({ value: '', label: '' });

	// checks if the station input is empty
	const [hasNoStationInput, setHasNoStationInput] = useState(false);
	const [defaultLineInputValue, setDefaultLineInputValue] = useState(''); 
	const [defaultStationInputValue, setDefaultStationInputValue] = useState(''); 
	const [defaultDirectionInputValue, setDefaultDirectionInputValue] = useState(''); 

	// these are the options/list on the dropdowns
	const [lines, setLines] = useState<Option[]>([]);
	const [stations, setStations] = useState<Option[]>([]);
	const [directions, setDirections] = useState<Option[]>([]);

	// the whole fetched list of stations and lines
	const [stationsAndLinesList, setStationsAndLinesList] = useState<StationsAndLinesList | null>(null);

	const handleSubmit = async (event: React.FormEvent) => {
		
		event.preventDefault();

		let hasError = false;

		if (stationPOST.label.trim() === '') {
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

		await reportInspector(linePOST, stationPOST, directionPOST);

		closeModal();
		onFormSubmit(); // Notify App component about the submission
	};

	const fetchStationsAndLines = async () => {
		const StationsAndLinesList: StationsAndLinesList =
			await getAllStationsAndLines();
	
		const lineKeys = Object.keys(StationsAndLinesList?.lines[0] || {});
		const stationKeys = Object.keys(StationsAndLinesList?.stations || {});

		for (const key of lineKeys) {
			if (!lines.some((line) => line.value === key)) {
				lines.push({ value: key, label: key });
			}
		}

		for (const key of stationKeys) {
			if (!stations.some((station) => station.value === key)) {
				stations.push({ value: key, label: (StationsAndLinesList?.stations[key as unknown as number] as unknown as StationProperty).name });
			}
		}
			
		setStationsAndLinesList(StationsAndLinesList);
		
		
		
		
	};


	const handleOnLineChange = (value: unknown, action: ActionMeta<unknown>) => {
		if (value === null){
			setDefaultLineInputValue('');
			if(action.action === 'clear'){
				fetchStationsAndLines();
				setDefaultDirectionInputValue('');
				setDefaultStationInputValue('');
			}
			return;
		}

		setDefaultLineInputValue(value as string);
		setDefaultStationInputValue('');
		setDefaultDirectionInputValue('');

		let StationList: Option[] = [];
		let DirectionList: Option[] = [];
		Object.entries(stationsAndLinesList?.lines[0] || {}).forEach(([line, lineStations]) => {
			if( line === (value as Option).value){
				for (const station of lineStations) {
					Object.entries(stationsAndLinesList?.stations || {}).forEach(([stationID, stationProperty]) => {
						if(station === stationID){
							StationList.push({ value: stationID, label: (stationProperty as unknown as StationProperty).name });
						}
					});
				}
				
			}
		});
		DirectionList.push(
			{
				value: StationList[0].value,
				label: StationList[0].label,
			},
			{
				value: StationList[StationList.length - 1].value,
				label: StationList[StationList.length - 1].label,
			}
		);
		
		setStations(StationList);
		setDirections(DirectionList);
	}
	const handleOnStationChange = (value: unknown, action: ActionMeta<unknown>) => {
		if (value === null){
			setDefaultStationInputValue('');
			if(action.action === 'clear'){
				fetchStationsAndLines();
				setDefaultDirectionInputValue('');
				setDefaultLineInputValue('');
			}
			return;
		}
		
		setDefaultStationInputValue(value as string);
		
		
		let LinesList: Option[] = [];
		
		console.log(value);
		Object.entries(stationsAndLinesList?.stations || {}).forEach(([stationID, stationProperty]) => {
			if ((value as Option).value === stationID) {
				(stationProperty as unknown as StationProperty).lines.forEach((line) => {
					LinesList.push({ value: line, label: line });
				});
			}
			
		});
		
		setLines(LinesList);


	}
	const handleOnDirectionChange = (value: unknown, action: ActionMeta<unknown>) => {
		if (value === null){
			setDefaultDirectionInputValue('');
			if(action.action === 'clear'){
				fetchStationsAndLines();
				setDefaultLineInputValue('');
				setDefaultStationInputValue('');
			}
			return;
		}
		setDefaultDirectionInputValue(value as string);
		
	}

	useEffect(() => {
		fetchStationsAndLines();
	}, []);

	return (
		<div className='report-form container'>
			<h1>Neue Meldung</h1>
			<form onSubmit={handleSubmit}>
				<AutocompleteInputForm
					className='line-select'
					options={lines}
					defaultInputValue={defaultLineInputValue}
					placeholder='Linie'
					onChange={(handleOnLineChange)}
				/>
				<div>
					<AutocompleteInputForm
						className='station-select'
						options={stations}
						placeholder='Station'
						defaultInputValue={defaultStationInputValue}
						hasNoStationInput={hasNoStationInput}
						onChange={handleOnStationChange}
					/>
				</div>
				<div>
					<AutocompleteInputForm
						className='direction-select'
						options={directions}
						placeholder='Richtung'
						defaultInputValue={defaultDirectionInputValue}
						onChange={handleOnDirectionChange}
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
