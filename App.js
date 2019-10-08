import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import MealsNavigator from './navigation/MealsNavigator';

//подгрузка шрифтов
const fetchFonts = async ()=>{
  await Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded){
    //когда ассинхронная функция fetchFonts загрузит шрифты значение тсанет тру и мы больше не будем рисовать загрузку
    return <AppLoading startAsync={fetchFonts} onFinish={setFontLoaded.bind(this, true)}/>;
  }

  return <MealsNavigator />;
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
