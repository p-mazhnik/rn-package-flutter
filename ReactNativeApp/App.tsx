/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useCallback, useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { FlutterScreen } from 'flutter-module-rn';

// import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
const Colors = {
  white: '#fff',
  black: '#000',
  light: '#ddd',
  dark: '#333',
  lighter: '#eee',
  darker: '#111',
};

const Stack = createNativeStackNavigator();

type RootStackParamList = {
  Home: { counter: number };
  Flutter: undefined;
};

function HomeScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'Home'>) {
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
          title={'Start Flutter Screen'}
          onPress={() => navigation.navigate('Flutter')}
        />
        <View style={{ alignSelf: 'center' }}>
          <Text>
            You have pushed the button on the Flutter screen this many times:
          </Text>
          <Text style={{ textAlign: 'center' }}>{route.params?.counter}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FlutterScreenWrapper({
  navigation,
}: NativeStackScreenProps<ParamListBase>) {
  const [counter, setCounter] = useState<number>(0);
  const onCounterIncrement = (value: number) => {
    console.log(`onCounterIncrement: ${value}`);
    setCounter(value);
  };
  const onScreenClose = useCallback(() => {
    console.log(`onScreenClose: ${counter}`);
    navigation.navigate({ name: 'Home', params: { counter }, merge: true });
  }, [counter, navigation]);
  return (
    <FlutterScreen
      onCounterIncrement={onCounterIncrement}
      onScreenClose={onScreenClose}
    />
  );
}

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ counter: 0 }}
        />
        <Stack.Screen name="Flutter" component={FlutterScreenWrapper} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
