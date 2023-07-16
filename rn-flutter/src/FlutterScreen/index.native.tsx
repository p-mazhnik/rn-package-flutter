import { ActivityIndicator, NativeEventEmitter, NativeModules, Platform, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import type { FlutterScreenProps } from './types'

const { FlutterModuleRn } = NativeModules;
const eventEmitter = new NativeEventEmitter(FlutterModuleRn);

const FlutterScreen: React.FC<FlutterScreenProps> = ({ initialCounterValue, onCounterIncrement, onScreenClose }) => {
  useEffect(() => {
    FlutterModuleRn.startFlutterActivity('setCounterValue', initialCounterValue.toString(), (text: string) => {
      console.log(text);
    });
  }, [])
  useEffect(() => {
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
