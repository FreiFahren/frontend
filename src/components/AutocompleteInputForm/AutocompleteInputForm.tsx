import React, { useState } from 'react';

import Select, {StylesConfig} from 'react-select';
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
      borderColor: hasError ? 'red' : '#ced4da',
      }),
  
  }

  return colourStyles;
}


    
export default function AutocompleteInputForm (props: { options: Option[] | undefined; placeholder: string; onChange: (value: any) => void; className: string; value?: Option; hasError?: boolean;}) {
  const [isSearchable, setIsSearchable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const colourStyles = setStyles(props.hasError);

  return (
    <>
    <div style={AutocompleteStyles}>
      <Select
        className={props.className}
        isLoading={isLoading}
        isSearchable={isSearchable}
        name="search"
        options={props.options}
        styles={colourStyles}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
      
    </>
  );
};