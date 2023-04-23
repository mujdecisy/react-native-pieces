import React from 'react';
import { ViewStyle, TextInput } from 'react-native';
import ColorScheme from '../../../utils/colors';
import { Settings } from '../types';

export interface InputTextProps {
  style: ViewStyle;
  value: string[];
  placeholder: string;
  handleChange: (value: string[]) => void;
  settings: Settings[];
}

const InputText = (props: InputTextProps) => {
  if (props.value.length !== 1) {
    console.error('Value array must have only one string value inside.');
    return <></>;
  }
  return (
    <TextInput
      style={props.style}
      value={props.value[0]}
      multiline={props.settings.includes(Settings.TEXT_MULTILINE)}
      numberOfLines={
        props.settings.includes(Settings.TEXT_MULTILINE) ? 5 : undefined
      }
      onChangeText={(value: string) => props.handleChange([value])}
      placeholder={props.placeholder}
      placeholderTextColor={ColorScheme.get().textLight}
    />
  );
};

export default InputText;
