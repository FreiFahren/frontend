
import Select, {ActionMeta, StylesConfig} from 'react-select';
import { AutocompleteStyles } from './AutocompleteStyles';

export interface Option {
  value: string;
  label: string;
}

export function setStyles (hasError: boolean | undefined, isIndicatorSeparator: boolean | undefined, isDropdownIndicator: boolean | undefined): StylesConfig {
   const colourStyles: StylesConfig = {
    control: (styles) => ({
      ...styles,
      marginTop: '2%',
      marginBottom: '2%',
      justifyContent: 'center',
      justifyItems: 'center',
      padding: '10px',
      fontSize: '1.3rem',
      borderColor: hasError ? 'red' : '#ced4da',
      
      }),
      indicatorSeparator: (base) => ({
        ...base,
        display: isIndicatorSeparator ? 'block' : 'none',
      }),
      dropdownIndicator: defaultStyles => ({
        ...defaultStyles,
        display: isDropdownIndicator ? 'block' : 'none',
      }),
  }

  return colourStyles;
}

export interface AutocompleteInputFormProps {
  options: Option[] | undefined;
  placeholder: string;
  onChange: (value: unknown | Option, action: ActionMeta<unknown>) => void;
  className: string;
  value?: Option;
  hasNoStationInput?: boolean;
  defaultInputValue: string;
  isIndicatorSeparator?: boolean;
  isDropdownIndicator?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
}

export default function AutocompleteInputForm(props: AutocompleteInputFormProps) {

  const colourStyles = setStyles(props.hasNoStationInput, props.isIndicatorSeparator, props.isDropdownIndicator);

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
        isLoading={props.isLoading}
        isDisabled={props.isDisabled}

      />
    </div>

    </>
  );
}