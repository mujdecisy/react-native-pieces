import Layout from '../../components/Layout';
import Header from '../../components/Header';
import ContentView from '../../components/ContentView';
import React, { useEffect, useState } from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Input from '../../components/Input';
import { useIsFocused } from '@react-navigation/native';
import { InputTypes, Settings } from '../../components/Input/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonText from '../../components/ButtonText';

export interface ScreenIOStorageProps {
  navigation: NativeStackNavigationProp<any, any>;
  relatedKeys: string[];
}

export default function ScreenIOStorage({
  navigation,
  relatedKeys,
}: ScreenIOStorageProps) {
  const [key, setKey] = useState('0');
  const [content, setContent] = useState('');
  const isFocused = useIsFocused();

  const load = async (keyP?: string) => {
    const data = await AsyncStorage.getItem(
      relatedKeys[parseInt(keyP || key)] || ''
    );
    setContent(data || '');
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <Layout>
      <Header navigation={navigation} title="Check" buttons={[]} />
      <ContentView>
        <Input
          label="Key"
          value={[key]}
          type={InputTypes.SINGLE}
          handleChange={(value) => {
            setKey(value[0] || '0');
            load(value[0]);
          }}
          options={relatedKeys}
        />

        <Input
          label="Content"
          value={[content]}
          type={InputTypes.TEXT}
          handleChange={(value) => {
            setContent(value[0] || '');
          }}
          settings={[Settings.TEXT_MULTILINE_12]}
        />

        <ButtonText
          label="Save"
          handleClick={() => {
            AsyncStorage.setItem(relatedKeys[parseInt(key)] || '', content);
          }}
        />
      </ContentView>
    </Layout>
  );
}
