import { Platform, Text, View } from 'react-native'
import React from 'react'

const FlutterScreen = () => {
  // todo: web implementation
  return (
    <View>
      <Text>Hello from RN wrapper for Flutter {Platform.OS}!</Text>
    </View>
  )
}

export default FlutterScreen;
