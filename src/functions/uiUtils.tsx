import { selectOption } from '../components/AutocompleteInputForm/AutocompleteInputForm';

type StationsList = {
  [key: string]: {
    name: string;
    lines: string[];
  };
};

type LinesList = {
  [key: string]: string[];
};

export function highlightElement(id: string) {
    const element = document.getElementById(id);

    if(element !== null) {
      if (element) {
        element.classList.add('highlight');
        setTimeout(() => {
          element.classList.remove('highlight');
        }, 3000);
      }
    }else{

    const elementClass = document.getElementsByClassName(id);

    if (elementClass) {
      elementClass[0].classList.add('highlight');
      setTimeout(() => {
        elementClass[0].classList.remove('highlight');
      }, 3000);
    }
    }
}

// when a station is selected, the line options are redefined, giving only the lines that the station is connected to
export const redefineLineOptions = (option: selectOption, stationsList: StationsList): selectOption[] => {
  const newLineOptions = Object.entries(stationsList)
    .filter(([station_id]) => station_id === option.value)
    .flatMap(([, station]) => station.lines.map(line => ({ value: line, label: line })));

  return newLineOptions;
}

// when a line is selected, the station options are redefined, giving only the stations that the line is connected to
export const redefineStationOptions = (option: selectOption, linesList: LinesList, stationsList: StationsList): selectOption[] => {
  const newStationOptions: selectOption[] = [];

  for (const station_id of linesList[option.value]) {
    newStationOptions.push({ value: station_id, label: stationsList[station_id].name });
  }

  return newStationOptions;
}

// when a line is selected, the direction options are redefined, giving only the first and last station of the line
export const redefineDirectionOptions = (option: selectOption, linesList: LinesList, stationsList: StationsList): selectOption[] => {
  const length = linesList[option.value].length;
  const { 0: firstStationId, [length - 1]: lastStationId } = linesList[option.value];
  const newDirectionOptions = [
    { value: firstStationId, label: stationsList[firstStationId].name },
    { value: lastStationId, label: stationsList[lastStationId].name },
  ];

  return newDirectionOptions;
}

export function createWarningSpan(elementId: string, message: string) {
  let warningSpan = document.getElementById('warning-span');
  if (!warningSpan) {
      warningSpan = document.createElement('span');
      warningSpan.id = 'warning-span';
      warningSpan.className = 'red-highlight';
      warningSpan.textContent = message;
      document.getElementById(elementId)?.appendChild(warningSpan);
  }
}

// for dark and standard layer
export const darkModeIds = ['report-button', 'toggle-layer-button', 'util-button']

export const setDarkMode = (ids: string[]) => {
	for (const id of ids) {
		const element = document.getElementsByClassName(id);
		if (element) {
			element.item(0)?.classList.add('dark-mode');

		}
	}

};

export const removeDarkMode = (ids: string[]) => {
	for (const id of ids) {
		const element = document.getElementsByClassName(id);
		if (element) {
			element.item(0)?.classList.remove('dark-mode');
		}
	}

};