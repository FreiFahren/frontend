import React, { useEffect, useState } from 'react';
import { ActionMeta } from 'react-select/';

import {
	LinesList,
	StationList,
	StationProperty,
	getAllLinesList,
	getAllStationsList,
	reportInspector,
} from '../../functions/dbUtils';
import AutocompleteInputForm, {
	selectOption,
} from '../AutocompleteInputForm/AutocompleteInputForm';
import { highlightElement, redefineDirectionOptions, redefineLineOptions, redefineStationOptions } from '../../functions/uiUtils';

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
			highlightElement('privacy-label'); // Highlight the 'privacy-checkbox' input field
			hasError = true;
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
		<div className={`report-form container ${className}`}>
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
