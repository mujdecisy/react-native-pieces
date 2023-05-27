import React from 'react';
import {
  View,
  StyleSheet,
  Modal as Mdl,
  ViewStyle,
  Dimensions,
} from 'react-native';
import ButtonIcon from '../ButtonIcon';
import { faMultiply } from '@fortawesome/free-solid-svg-icons';
import ColorScheme from '../../utils/colors';
import SizeScheme from '../../utils/sizes';
import Takoz from '../Takoz';

export interface ModalProps {
  visible: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
}

const Modal = (props: ModalProps) => {
  const height = Math.min(
    SizeScheme.get().screen.height.screen,
    SizeScheme.get().screen.height.window
    );
  const width = Math.min(
    Math.max(Dimensions.get('window').width, SizeScheme.get().screen.width.min),
    SizeScheme.get().screen.width.max
  );

  return (
    <Mdl animationType="fade" transparent={true} visible={props.visible}>
      <View style={styles.wrapper}>
        <View
          style={{
            ...styles.container,
            ...{ width },
            ...props.style,
            ...(props.style?.height && typeof props.style.height === 'number'
              ? { marginTop: height - props.style.height }
              : {}),
          }}
        >
          {!props.style?.height && <Takoz />}
          <View style={styles.header}>
            <ButtonIcon faIcon={faMultiply} handleClick={props.handleClose} />
          </View>
          {props.children}
        </View>
      </View>
    </Mdl>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: ColorScheme.hyalo(ColorScheme.get().secondary, 0.5),
  },
  container: {
    height: '100%',
    marginTop: 0,
    marginHorizontal: 'auto',
    backgroundColor: ColorScheme.get().backgroundLight,
    paddingHorizontal: SizeScheme.get().gap.pad,
    paddingVertical: SizeScheme.get().gap.pad / 2,
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
});

export default Modal;
