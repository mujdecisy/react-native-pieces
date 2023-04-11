import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SizeScheme from '../../utils/sizes';
import ColorScheme from '../../utils/colors';
import { shadowBox } from '../../utils/styles';
import InputText from './InputText';
import InputNumber from './InputNumber';
import InputDate, {
  InputDateModalContent,
  InputDateRightButton,
} from './InputDate';
import Modal from '../Modal';
import InputSelect, { InputSelectModalContent } from './InputSelect';
import { InputTypes, ValidStates } from './types';

export interface InputProps {
  label: string;
  value: string[];
  type: InputTypes;
  handleChange: (value: string[], validState: ValidStates) => void;
  options?: string[];
  placeholder?: string;
}

const COLOR_PRIMARY_LIGHT = ColorScheme.hyalo(ColorScheme.get().primary, 0.3);
const SIZE_RIGHT_BUTTON = SizeScheme.get().font.c - 5;

const DEFAULT_PLACEHOLDERS = {
  [InputTypes.TEXT]: '',
  [InputTypes.NUMBER]: '±###.###',
  [InputTypes.DATE]: 'yyyy-mm-dd',
  [InputTypes.SINGLE]: 'Select One',
  [InputTypes.MULTI]: 'Select One Or More',
};

const Input = (props: InputProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  let customInput = <></>;
  let rightButton = <></>;
  let modalContent = <></>;

  switch (true) {
    case props.type === InputTypes.TEXT:
      customInput = (
        <InputText
          style={styles.input}
          handleChange={(value) => {
            props.handleChange(value, ValidStates.UNDEFINED);
          }}
          value={props.value}
          placeholder={props.placeholder || DEFAULT_PLACEHOLDERS[props.type]}
        />
      );
      break;
    case props.type === InputTypes.NUMBER:
      customInput = (
        <InputNumber
          style={styles.input}
          handleChange={(value, valid) => {
            props.handleChange(value, valid);
          }}
          value={props.value}
          placeholder={props.placeholder || DEFAULT_PLACEHOLDERS[props.type]}
        />
      );
      break;
    case props.type === InputTypes.DATE:
      customInput = (
        <InputDate
          style={styles.input}
          handleChange={(value, valid) => {
            props.handleChange(value, valid);
          }}
          value={props.value}
          placeholder={props.placeholder || DEFAULT_PLACEHOLDERS[props.type]}
        />
      );
      rightButton = (
        <InputDateRightButton
          style={styles.rightButton}
          buttonSize={SIZE_RIGHT_BUTTON}
          handleClick={() => {
            setModalVisible(true);
          }}
        />
      );
      modalContent = (
        <InputDateModalContent
          targetDate={props.value}
          handleChange={(value) => {
            props.handleChange(value, ValidStates.VALID);
            setModalVisible(false);
          }}
        />
      );
      break;
    case props.type === InputTypes.SINGLE || props.type === InputTypes.MULTI:
      customInput = (
        <InputSelect
          handleModalOpen={() => {
            setModalVisible(true);
          }}
          options={props.options || []}
          placeholder={props.placeholder || DEFAULT_PLACEHOLDERS[props.type]}
          style={styles.input}
          textStyle={{ minHeight: 30 }}
          value={props.value}
        />
      );
      modalContent = (
        <InputSelectModalContent
          handleChange={(value) => {
            props.handleChange(value, ValidStates.VALID);
            setModalVisible(false);
          }}
          options={props.options || []}
          type={props.type as InputTypes.SINGLE | InputTypes.MULTI}
          value={props.value}
        />
      );
      break;
    default:
      break;
  }

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.label}>{props.label}</Text>
        <View>
          {customInput}
          {rightButton}
        </View>
      </View>
      <Modal
        visible={modalVisible}
        handleClose={() => {
          setModalVisible(false);
        }}
        style={{ height: 470 }}
      >
        {modalContent}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: SizeScheme.get().font.e,
    marginBottom: 3,
  },
  input: {
    fontSize: SizeScheme.get().font.d,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: COLOR_PRIMARY_LIGHT,
    flex: 1,
    ...shadowBox(),
  },
  rightButton: {
    position: 'absolute',
    right: SizeScheme.get().gap.pad / 2,
    color: ColorScheme.get().textLight,
  },
  inputRow: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Input;
