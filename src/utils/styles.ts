import { StyleSheet } from 'react-native';
import ColorScheme from './colors';

export const shadowBox = (color?: string) => {
  const shadowColor = ColorScheme.hyalo(
    color || ColorScheme.get().shadowColor,
    0.5
  );
  return StyleSheet.create({
    shadowBuiltin: {
      shadowColor,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
    },
  }).shadowBuiltin;
};
