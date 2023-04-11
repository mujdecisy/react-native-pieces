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
    throw new Error('Value array must have only one string value inside.');
  }

  const localHandleChange = (value: string) => {
    let tValid = ValidStates.UNDEFINED;
    let tBgColor = props.style.backgroundColor;
    if (value !== '') {
      tValid =
        !isNaN(parseFloat(value)) && !isNaN(+value)
          ? ValidStates.VALID
          : ValidStates.INVALID;
      tBgColor =
        tValid === ValidStates.VALID
          ? ColorScheme.hyalo(ColorScheme.get().positive)
          : ColorScheme.hyalo(ColorScheme.get().negative);
    }
    setBgColor(tBgColor);
    props.handleChange([value], tValid);
  };

  return (
    <TextInput
      style={[props.style, { backgroundColor: bgColor }]}
      value={props.value[0]}
      onChangeText={(value: string) => localHandleChange(value)}
      placeholder={props.placeholder}
      placeholderTextColor={ColorScheme.get().textLight}
    />
  );
};

export default InputNumber;
