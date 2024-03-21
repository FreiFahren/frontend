import { Option } from '../components/AutocompleteInputForm/AutocompleteInputForm';

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

export const redefineLineOptions = (option: Option, stationsList: StationsList): Option[] => {
  const newLineOptions = Object.entries(stationsList)
    .filter(([station_id]) => station_id === option.value)
    .flatMap(([, station]) => station.lines.map(line => ({ value: line, label: line })));

  return newLineOptions;
}

export const redefineStationOptions = (option: Option, linesList: LinesList, stationsList: StationsList): Option[] => {
  const newStationOptions: Option[] = [];

  for (const station_id of linesList[option.value]) {
    newStationOptions.push({ value: station_id, label: stationsList[station_id].name });
  }

  return newStationOptions;
}

export const redefineDirectionOptions = (option: Option, linesList: LinesList, stationsList: StationsList): Option[] => {
  const length = linesList[option.value].length;
  const { 0: firstStationId, [length - 1]: lastStationId } = linesList[option.value];
  const newDirectionOptions = [
    { value: firstStationId, label: stationsList[firstStationId].name },
    { value: lastStationId, label: stationsList[lastStationId].name },
  ];

  return newDirectionOptions;
}