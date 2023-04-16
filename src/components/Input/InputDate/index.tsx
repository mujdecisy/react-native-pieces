import React, { useState } from 'react';
import { ViewStyle, TextInput } from 'react-native';
import ColorScheme from '../../../utils/colors';
import { ValidStates } from '../types';
import ButtonIcon from '../../ButtonIcon';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import Calendar, { dateToString } from '../../Calendar';
import ButtonText from '../../ButtonText';
import Takoz from '../../Takoz';

export interface InputDateProps {
  style: ViewStyle;
  value: string[];
  placeholder?: string;
  handleChange: (value: string[], valid: ValidStates) => void;
}

const InputDate = (props: InputDateProps) => {
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
        const tValid = isDate(value);
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
    new Date(targetDate[0] || new Date().getTime())
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

export const isDate = (value: string) => {
  if (value === '') {
    return ValidStates.UNDEFINED;
  }
  const tokens = value.split('-').map(Number);
  if (tokens.length !== 3) {
    return ValidStates.INVALID;
  }
  const year = tokens[0] as number;
  const month = tokens[1] as number;
  const day = tokens[2] as number;

  if (
    isNaN(year) ||
    isNaN(month) ||
    isNaN(day) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return ValidStates.INVALID;
  }
  if (
    (month === 4 || month === 6 || month === 9 || month === 11) &&
    day === 31
  ) {
    return ValidStates.INVALID;
  }
  if (
    month === 2 &&
    (((year % 4 !== 0 || year % 100 === 0) && year % 400 !== 0 && day > 28) ||
      day > 29)
  ) {
    return ValidStates.INVALID;
  }
  return ValidStates.VALID;
};
