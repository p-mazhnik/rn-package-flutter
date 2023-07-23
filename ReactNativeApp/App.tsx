/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
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
  const [screen, setScreen] = React.useState('counter');
  const [clicks, setClicks] = React.useState(0);
  const [text, setText] = React.useState('');
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
        <Button
          color="orange"
          title={'React Native button'}
          onPress={() => {}}
        />
        <View style={styles.componentInScroll}>
          <FlutterView
            webConfig={{
              useIframe: false,
              assetBase: '/flutter/',
              src: 'flutter/main.dart.js',
            }}
            clicks={clicks}
            screen={screen}
            text={text}
            onClicksChange={setClicks}
            onTextChange={setText}
            onScreenChange={setScreen}
          />
        </View>
        <Button
          color="orange"
          title={'React Native button'}
          onPress={() => {}}
        />
        <View style={styles.componentInScroll}>
          <FlutterView
            webConfig={{
              useIframe: true,
              assetBase: '/flutter/',
              src: 'flutter/main.dart.js',
            }}
            clicks={clicks}
            text="initial text"
            screen="counter"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const App: React.FC = () => {
  return <HomeScreen />;
};

export default App;
