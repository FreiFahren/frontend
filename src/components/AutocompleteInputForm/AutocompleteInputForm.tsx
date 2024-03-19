
import Select, {ActionMeta, StylesConfig} from 'react-select';
import { AutocompleteStyles } from './AutocompleteStyles';

export interface Option {
  value: string;
  label: string;
}

export function setStyles (hasError: boolean | undefined) {
   const colourStyles: StylesConfig = {
    control: (styles) => ({
      ...styles,
      marginTop: '2%',
      marginBottom: '2%',
      justifyContent: 'center',
      justifyItems: 'center',
      padding: '10px',
      fontSize: '1.4rem',
      borderColor: hasError ? 'red' : '#ced4da',
      }),

  }

  return colourStyles;
}

export default function AutocompleteInputForm (props: { options: Option[] | undefined; placeholder: string; onChange: (value: unknown | Option, action: ActionMeta<unknown>)  => void; className: string; value?: Option; hasNoStationInput?: boolean; defaultInputValue: string;}) {

  const colourStyles = setStyles(props.hasNoStationInput);

  return (
    <>
    <div style={AutocompleteStyles}>
      <Select
        className={props.className}
        value={props.defaultInputValue}
        isClearable={true}
        noOptionsMessage={() => 'Keine Optionen'}
        name='search'
        options={props.options}
        styles={colourStyles}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>

    </>
  );
}