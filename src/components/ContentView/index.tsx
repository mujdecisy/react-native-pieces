import { SizeScheme } from 'react-native-pieces';
import React from 'react';
import { ScrollView, View } from 'react-native';

export enum ContentViewType {
  SCROLLVIEW,
  VIEW,
}

export interface ContentViewProps {
  viewType?: ContentViewType;
  children: React.ReactNode;
}

export default function ContentView({ viewType, children }: ContentViewProps) {
  const headerHeight = 145;
  const height = SizeScheme.get().screen.height.min - headerHeight;
  let view;
  if (viewType === ContentViewType.SCROLLVIEW) {
    view = <ScrollView style={{ height }}>{children}</ScrollView>;
  } else {
    view = <View style={{ minHeight: height }}>{children}</View>;
  }

  return view;
}
