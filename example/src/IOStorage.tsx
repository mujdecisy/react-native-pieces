import React from 'react';
import { ScreenIOStorage } from '@19sth/react-native-pieces';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function IOStorage({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any, any>;
}) {
  return (
    <ScreenIOStorage navigation={navigation} relatedKeys={['A', 'B', 'C']} />
  );
}
