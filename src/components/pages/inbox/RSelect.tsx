import React from 'react';
import RSelect, { Props } from 'react-select';

const Select = ({ options, ...props }: Props) => {
  return (
    <RSelect
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderRadius: '8px',
          padding: '3px',
          boxShadow: '0 1px 3px rgba(45,45,45,0.2)',
          borderColor: state.isFocused ? 'grey' : '#e5e5e5',
          fontSize: '16px',
          textTransform: 'capitalize',
          '::placeholder': {
            fontSize: '12px',
          },
          ':hover': {
            borderColor: 'blue',
          },
        }),
      }}
      placeholder={props.placeholder ?? 'BCC'}
      options={options}
      {...props}
    />
  );
};

export default Select;
