import React, { useEffect, useState } from 'react';
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
  const [lineCount, setLineCount] = useState(1);
  useEffect(()=>{
    if (props.settings.includes(Settings.TEXT_MULTILINE_6)) {
      setLineCount(6);
    } else if (props.settings.includes(Settings.TEXT_MULTILINE_12)) {
      setLineCount(12);
    } else {
      setLineCount(1);
    }
  }, []);

  if (props.value.length !== 1) {
    console.error('Value array must have only one string value inside.');
    return <></>;
  }

  return (
    <TextInput
      style={props.style}
      value={props.value[0]}
      multiline={lineCount>1}
      numberOfLines={lineCount}
      onChangeText={(value: string) => props.handleChange([value])}
      placeholder={props.placeholder}
      placeholderTextColor={ColorScheme.get().textLight}
    />
  );
};

export default InputText;
