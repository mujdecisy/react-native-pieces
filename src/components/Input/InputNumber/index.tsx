import React, { useState } from 'react';
import { ViewStyle, TextInput } from 'react-native';
import ColorScheme from '../../../utils/colors';
import { ValidStates } from '../types';

export interface InputNumberProps {
  style: ViewStyle;
  value: string[];
  placeholder: string;
  handleChange: (value: string[], valid: ValidStates) => void;
}

const InputNumber = (props: InputNumberProps) => {
  const [bgColor, setBgColor] = useState(props.style.backgroundColor);

  if (props.value.length !== 1) {
    console.error('Value array must have only one string value inside.');
    return <></>;
  }

  return (
    <TextInput
      style={[props.style, { backgroundColor: bgColor }]}
      value={props.value[0]}
      onChangeText={(value: string) => {
        const tValid = isNumber(value);
        setBgColor(
          {
            [ValidStates.UNDEFINED]: props.style.backgroundColor,
            [ValidStates.VALID]: ColorScheme.hyalo(ColorScheme.get().positive),
            [ValidStates.INVALID]: ColorScheme.hyalo(
              ColorScheme.get().negative
            ),
          }[tValid]
        );
        props.handleChange([value], tValid);
      }}
      placeholder={props.placeholder}
      placeholderTextColor={ColorScheme.get().textLight}
    />
  );
};

export default InputNumber;

const isNumber = (value: string) => {
  if (value === '') {
    return ValidStates.UNDEFINED;
  }
  return !isNaN(parseFloat(value)) && !isNaN(+value)
    ? ValidStates.VALID
    : ValidStates.INVALID;
};
