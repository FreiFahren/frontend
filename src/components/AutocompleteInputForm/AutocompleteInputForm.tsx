import React, { useState } from 'react';

import Select, {StylesConfig} from 'react-select';
import { AutocompleteStyles } from './AutocompleteStyles';

export interface Option {
  value: string;
  label: string;
}

const colourStyles: StylesConfig = {
  control: (styles) => ({ 
    ...styles, 
    marginBottom: '5%',
    textAlign: 'center',
    justifyContent: 'center',
    justifyItems: 'center',}),
  
}

    
export default function AutocompleteInputForm (props: { options: Option[] | undefined; placeholder: string; onChange: (value: any) => void; className: string; value?: Option;}) {
  const [isSearchable, setIsSearchable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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