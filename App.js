import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Home from './source/Home'
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

export default () => {
  let [fontsLoaded] = useFonts({
    'Noto Sans SC': require('./assets/fonts/NotoSansSC-Regular.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <Home />
      <StatusBar style="light" />
    </>
  );
}

