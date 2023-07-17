/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  StyleSheet,
} from 'react-native';
import { FlutterView } from 'flutter-module-rn';

// import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
const Colors = {
  lighter: '#eee',
};

const styles = StyleSheet.create({
  componentInScroll: {
    height: 200,
    backgroundColor: 'white',
  },
});

function HomeScreen() {
  // const [initialCounterValue, setCounter] = useState<number>(0);
  const backgroundStyle = {
    backgroundColor: Colors.lighter,
    flex: 1,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Button title={'React Native button'} onPress={() => {}} />
        <View style={styles.componentInScroll}>
          <FlutterView />
        </View>
        <Button title={'React Native button'} onPress={() => {}} />
        <View style={styles.componentInScroll}>
          <FlutterView />
        </View>
        {/*<View>
          <Text>Enter initial counter value</Text>
          <TextInput
            keyboardType="numeric"
            onChangeText={text => setCounter(Number(text))}
            value={initialCounterValue.toString()}
            maxLength={10}
          />
        </View>
        <View style={{ alignSelf: 'center' }}>
          <Text>
            You have pushed the button on the Flutter screen this many times:
          </Text>
          <Text style={{ textAlign: 'center' }}>{route.params.counter}</Text>
        </View>*/}
      </ScrollView>
    </SafeAreaView>
  );
}

const App: React.FC = () => {
  return <HomeScreen />;
};

export default App;
