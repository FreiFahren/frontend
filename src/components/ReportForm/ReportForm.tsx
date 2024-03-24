import React, { useEffect, useState } from 'react';
import { ActionMeta } from 'react-select/';

import { LinesList, StationList, StationProperty, getAllLinesList, getAllStationsList, reportInspector } from '../../functions/dbUtils';
import AutocompleteInputForm, { selectOption } from '../AutocompleteInputForm/AutocompleteInputForm';
import { highlightElement, redefineDirectionOptions, redefineLineOptions, redefineStationOptions } from '../../functions/uiUtils';
import { getPosition } from '../Map/Markers/Classes/LocationMarker/LocationMarker';
import './ReportForm.css';

interface ReportFormProps {
  closeModal: () => void;
  onFormSubmit: () => void;
  className?: string;
}

type reportFormState = {
	lineInput: selectOption | undefined;
	stationInput: selectOption | undefined;
	directionInput: selectOption | undefined;
	lineOptions: selectOption[];
	stationOptions: selectOption[];
	directionOptions: selectOption[];
	stationsList: StationList;
	linesList: LinesList;
	isLoadingLines: boolean;
	isLoadingStations: boolean;
	
};

const initialState: reportFormState = {
	lineInput: undefined,
	stationInput: undefined,
	directionInput: undefined,
	lineOptions: [],
	stationOptions: [],
	directionOptions: [],
	stationsList: {},
	linesList: {},
	isLoadingLines: true,
	isLoadingStations: true,
};

const redHighlight = (text: string) => {
	return <>{text}<span className='red-highlight'>*</span></>
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
	const R = 6371; // Radius of the earth in km
	const dLat = deg2rad(lat2 - lat1);
	const dLon = deg2rad(lon2 - lon1);
	const a =
	  Math.sin(dLat / 2) * Math.sin(dLat / 2) +
	  Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
	  Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = R * c; // Distance in km
	return distance;
}
  
function deg2rad(deg: number) {
	return deg * (Math.PI / 180);
}

const ReportForm: React.FC<ReportFormProps> = ({
	closeModal,
	onFormSubmit,
	className,
}) => {

	const [reportFormState, setReportFormState] = useState<reportFormState>(initialState);

	const emptyOption = '' as unknown as selectOption;

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		let hasError = false;

		if (reportFormState.stationInput === undefined || reportFormState.stationInput === emptyOption) {
			highlightElement('station-select-component__control');
			hasError = true;
		}

		if (!(document.getElementById('privacy-checkbox') as HTMLInputElement).checked) {
			highlightElement('privacy-label');
			hasError = true;
		}

		const userLocation = await getPosition();
    
		if (userLocation && reportFormState.stationInput) {
			const station = reportFormState.stationsList[reportFormState.stationInput.value];
			if (station) {
				const distance = calculateDistance(userLocation[0], userLocation[1], station.coordinates.latitude, station.coordinates.longitude);
				if (distance > 1) { // If the distance is more than 1 km
					highlightElement('station-select-div');
					hasError = true;
				}
			}
		}
	
		if (hasError) return; // If there is an error, do not proceed with the submission

		const { lineInput, stationInput, directionInput } = reportFormState;

		await reportInspector(lineInput!, stationInput!, directionInput!);

		closeModal();
		onFormSubmit(); // Notify App component about the submission
	};

	const refreshOptions = async (type: 'lines' | 'stations') => {
		try {
			setReportFormState(prevState => ({ ...prevState,
				[type === 'lines' ? 'isLoadingLines' : 'isLoadingStations']: true }));

			const list = type === 'lines' ? await getAllLinesList() : await getAllStationsList();
			const options = Object.keys(list).map(key => ({ value: key, label: type === 'lines' ? key : (list[key] as StationProperty).name }));

			setReportFormState(prevState => ({ ...prevState, [type === 'lines' ? 'linesList' : 'stationsList']: list, [type === 'lines' ? 'lineOptions' : 'stationOptions']: options }));

		} catch (error) {
			console.error(`Failed to fetch ${type}:`, error);
		} finally {
			setReportFormState(prevState => ({ ...prevState, [type === 'lines' ? 'isLoadingLines' : 'isLoadingStations']: false }));
		}
	};

	const handleOnLineChange = (option: selectOption, action: ActionMeta<unknown>) => {
		if (action.action === 'clear') {
			setReportFormState(prevState => ({ ...prevState, lineInput: emptyOption, directionInput: emptyOption, directionOptions: [] }));
			refreshOptions('stations');
			return;
		}

		setReportFormState(prevState =>
		({
			...prevState,
			lineInput: option,
			directionOptions: redefineDirectionOptions(option, reportFormState.linesList, reportFormState.stationsList),
			stationOptions: redefineStationOptions(option, reportFormState.linesList, reportFormState.stationsList)
		}));

	}

	const handleOnStationChange = (option: selectOption, action: ActionMeta<unknown>) => {
		if (action.action === 'clear') {
			setReportFormState(prevState => ({ ...prevState, stationInput: emptyOption, lineInput: emptyOption, directionInput: emptyOption }));
			refreshOptions('stations');
			refreshOptions('lines');

			return;
		}

		setReportFormState(prevState => ({ ...prevState, stationInput: option, lineOptions: redefineLineOptions(option, reportFormState.stationsList) }));
	}

	useEffect(() => {
		const fetchData = async () => {
			await refreshOptions('stations');
			await refreshOptions('lines');
		};

		fetchData();
	}, []);

	return (
		<div className={`report-form container ${className}`} id='report-form'>
			<h1>Neue Meldung</h1>
			<form onSubmit={handleSubmit}>

				<div id='station-select-div'>
					<AutocompleteInputForm
						className='station-select'
						classNamePrefix='station-select-component'
						options={reportFormState.stationOptions}
						placeholder={redHighlight('Station')}
						defaultInputValue={reportFormState.stationInput}
						onChange={(value, action) => handleOnStationChange(value as selectOption, action)}
						isDisabled={reportFormState.isLoadingStations}

					/>

				</div>
				<div className='line-direction-container'>
					<div className='line-select-container'>
						<AutocompleteInputForm
							className='line-select'
							options={reportFormState.lineOptions}
							defaultInputValue={reportFormState.lineInput}
							placeholder='Linie'
							onChange={(value, action) => handleOnLineChange(value as selectOption, action)}
							isDropdownIndicator={false}
							isIndicatorSeparator={false}
							isDisabled={reportFormState.isLoadingLines}
						/>
					</div>
					<div className='direction-select-container'>
						<AutocompleteInputForm
							className='direction-select'
							options={reportFormState.directionOptions}
							placeholder='Richtung'
							defaultInputValue={reportFormState.directionInput}
							onChange={(option) => setReportFormState(prevState => ({ ...prevState, directionInput: option as selectOption }))}
							isDropdownIndicator={false}
							isIndicatorSeparator={false}
							isDisabled={reportFormState.isLoadingStations}
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
						{redHighlight('')}
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
