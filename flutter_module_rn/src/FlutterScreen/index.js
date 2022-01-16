import { NativeModules, Platform, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const { FlutterModuleRn } = NativeModules;

const FlutterScreen = () => {
  useEffect(() => {
    FlutterModuleRn.startFlutterActivity('', 0, (text: string) => {
      console.log(text);
    });
  }, [])
  return (
    <View>
      <Text>Hello from RN wrapper for Flutter {Platform.OS}!</Text>
    </View>
  )
}

export default FlutterScreen;
