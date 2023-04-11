import React from 'react';
import { ViewStyle, TextInput } from 'react-native';
import ColorScheme from '../../../utils/colors';

export interface InputTextProps {
    style: ViewStyle
    value: string[]
    placeholder: string
    handleChange: (value: string[]) => void 
}

const InputText = (props: InputTextProps) => {
    return (
        <TextInput
            style={props.style}
            value={props.value.length>0? props.value[0]:''}
            onChangeText={(value: string)=>props.handleChange([value])}
            placeholder={props.placeholder}
            placeholderTextColor={ColorScheme.get().textLight}
        />
    );
};

export default InputText;
