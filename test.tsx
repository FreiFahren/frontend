const ReportForm: React.FC<ReportFormProps> = ({
	closeModal,
	onFormSubmit,
}) => {
	const [line, setLine] = useState('');
	const [station, setStation] = useState('');
	const [direction, setDirection] = useState('');

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		console.log(line, station, direction);

		if (station === '' || line === '' || direction === '') {
			alert('Bitte füllen Sie alle Felder aus');
			return;
		}
		await reportInspector((line as unknown as Option).label, (station as unknown as Option).value, (direction as unknown as Option).value);

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
		<div className="report-form container">
			<h1>Neue Meldung</h1>
			<form onSubmit={handleSubmit}>
				<AutocompleteInputForm
					className="line"
					options={lines}
					placeholder="Linie"
					onChange={(value) => setLine(value)}
				/>
				<AutocompleteInputForm
					className="station"
					options={stations}
					placeholder="Station"
					onChange={(value) => setStation(value)}
				/>
				<AutocompleteInputForm
					className="direction"
					options={stations}
					placeholder="Richtung"
					onChange={(value) => setDirection(value)}
				/>

				<button type="submit">Melden</button>
			</form>
		</div>
	);
}
