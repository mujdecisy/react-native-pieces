import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ColorScheme from '../../utils/colors';
import SizeScheme from '../../utils/sizes';
import { shadowBox } from '../../utils/styles';
import Takoz from '../Takoz';

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  return (
    <View style={styles.background}>
      <ScrollView>
        <View style={styles.container}>
          <Takoz height={40} />
          {props.children}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: ColorScheme.get().backgroundDark,
  },
  container: {
    maxWidth: SizeScheme.get().screen.width.max,
    minWidth: SizeScheme.get().screen.width.min,
    width: '100%',
    minHeight: '100%',
    marginHorizontal: 'auto',
    padding: SizeScheme.get().gap.pad,
    backgroundColor: ColorScheme.get().backgroundLight,
    ...shadowBox(),
  },
});

export default Layout;
