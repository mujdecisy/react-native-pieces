import React, { useRef, useState } from 'react';
import { ViewStyle, TextInput } from 'react-native';
import ColorScheme from '../../../utils/colors';
import { ValidStates } from '../types';
import ButtonIcon from '../../ButtonIcon';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import Calendar from '../../Calendar';
import { dateToString } from '../../Calendar';
import ButtonText from '../../ButtonText';
import Takoz from '../../Takoz';

export interface InputDateProps {
  style: ViewStyle;
  value: string[];
  placeholder?: string;
  handleChange: (value: string[], valid: ValidStates) => void;
}

const InputDate = (props: InputDateProps) => {
  const inputRef = useRef<TextInput>(null);

  const localHandleChange = (value: string) => {
    let tValid = ValidStates.UNDEFINED;
    let bgColor = props.style.backgroundColor;
    if (value !== '') {
      tValid = checkIfDate(value) ? ValidStates.VALID : ValidStates.INVALID;
      bgColor =
        tValid === ValidStates.VALID
          ? ColorScheme.hyalo(ColorScheme.get().positive)
          : ColorScheme.hyalo(ColorScheme.get().negative);
    }
    inputRef.current?.setNativeProps({
      style: { backgroundColor: bgColor },
    });
    props.handleChange([value], tValid);
  };

  return (
    <TextInput
      ref={inputRef}
      style={props.style}
      value={props.value.length > 0 ? props.value[0] : ''}
      onChangeText={(value: string) => localHandleChange(value)}
      placeholder={props.placeholder}
      placeholderTextColor={ColorScheme.get().textLight}
    />
  );
};

export default InputDate;

export const InputDateRightButton = ({
  handleClick,
  style,
  buttonSize,
}: {
  handleClick: () => void;
  style: ViewStyle;
  buttonSize: number;
}) => {
  return (
    <ButtonIcon
      style={style}
      faIcon={faCalendarDay}
      handleClick={handleClick}
      fontSize={buttonSize}
    />
  );
};

export const InputDateModalContent = ({
  targetDate,
  handleChange,
}: {
  targetDate: string[];
  handleChange: (date: string[]) => void;
}) => {
  const [stateTargetDate, setStateTargetDate] = useState(
    checkIfDate(targetDate[0]) ? new Date(targetDate[0] as string) : new Date()
  );

  return (
    <>
      <Calendar
        targetDate={stateTargetDate}
        handleChange={(date) => {
          setStateTargetDate(date);
        }}
      />
      <Takoz />
      <ButtonText
        label="Save"
        handleClick={() => {
          handleChange([dateToString(stateTargetDate)]);
        }}
      />
    </>
  );
};

export const checkIfDate = (value: string | undefined) => {
  if (!value) {
    return false;
  }
  const date = new Date(value);
  return (
    date instanceof Date &&
    !isNaN(date.getTime()) &&
    /\d{4}-\d{2}-\d{2}/.test(value)
  );
};
