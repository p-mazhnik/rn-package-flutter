import { ActivityIndicator, NativeEventEmitter, NativeModules, Platform, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const { FlutterModuleRn } = NativeModules;

const FlutterScreen = ({ onCounterIncrement, onScreenClose }) => {
  useEffect(() => {
    FlutterModuleRn.startFlutterActivity('', 0, (text) => {
      console.log(text);
    });
  }, [])
  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(FlutterModuleRn);
    const listener1 = eventEmitter.addListener('incrementCounter', (event) => {
      onCounterIncrement(event);
    });
    const listener2 = eventEmitter.addListener('closeFlutterScreen', () => {
      onScreenClose();
    });
    return () => {
      listener1.remove();
      listener2.remove();
    }
  }, [onScreenClose])
  return (
    <View>
      <ActivityIndicator size="large" />
      <Text>Hello from RN wrapper for Flutter {Platform.OS}!</Text>
    </View>
  )
}

export default FlutterScreen;
