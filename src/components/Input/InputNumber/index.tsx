import React, { useRef } from 'react';
import { ViewStyle, TextInput } from 'react-native';
import ColorScheme from '../../../utils/colors';
import { ValidStates } from '../types';

export interface InputNumberProps {
    style: ViewStyle
    value: string[]
    placeholder: string
    handleChange: (value: string[], valid: ValidStates) => void
}

const InputNumber = (props: InputNumberProps) => {
    const inputRef = useRef<TextInput>(null);

    const localHandleChange = (value: string) => {
        let tValid = ValidStates.UNDEFINED;
        let bgColor = props.style.backgroundColor;
        if (value !== '') {
            tValid = !isNaN(parseFloat(value)) && !isNaN(+value) ? ValidStates.VALID : ValidStates.INVALID;
            bgColor = (tValid===ValidStates.VALID)
                ?(ColorScheme.hyalo(ColorScheme.get().positive))
                :(ColorScheme.hyalo(ColorScheme.get().negative));
        }
        inputRef.current?.setNativeProps({
            style: {backgroundColor: bgColor}
        });
        props.handleChange([value], tValid);
    }

    return (
        <TextInput
            ref={inputRef}
            style={props.style}
            value={props.value.length>0? props.value[0]:''}
            onChangeText={(value: string)=>localHandleChange(value)}
            placeholder={props.placeholder}
            placeholderTextColor={ColorScheme.get().textLight}
        />
    );
};

export default InputNumber;
