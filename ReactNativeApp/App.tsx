import React from 'react';
import { ScrollView, View, StyleSheet, Platform, Linking } from 'react-native';
import { Appbar, SegmentedButtons, TextInput } from 'react-native-paper';
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlutterView } from 'flutter-module-rn';

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
  flutterContainer: {
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    marginVertical: 8,
    height: 480,
    width: 320,
  },
  scrollView: {
    flex: 1,
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    margin: 8,
  },
  textInput: {
    flex: 1,
  },
  segmentedButtons: {
    marginTop: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    minWidth: Platform.select({
      web: 500,
    }),
  },
});

function HomeScreen() {
  const [screen, setScreen] = React.useState('counter');
  const [clicks, setClicks] = React.useState(0);
  const [text, setText] = React.useState('');
  const dashIcon = () => <Icon name="flutter-dash" size={30} />;
  return (
    <View style={styles.app}>
      <Appbar.Header elevated>
        <Appbar.Content
          title={`React Native ${
            Platform.OS === 'web' ? 'Web' : ''
          } 🤝 Flutter`}
        />
        <Appbar.Action
          icon="github"
          size={30}
          onPress={() =>
            Linking.openURL('https://github.com/p-mazhnik/rn-package-flutter/')
          }
        />
        <Appbar.Action
          icon={dashIcon}
          size={30}
          onPress={() => Linking.openURL('https://flutter.dev/')}
        />
      </Appbar.Header>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
        contentContainerStyle={styles.main}>
        <SegmentedButtons
          style={styles.segmentedButtons}
          value={screen}
          onValueChange={setScreen}
          buttons={[
            {
              value: 'counter',
              label: 'Counter',
              icon: 'numeric',
            },
            {
              value: 'text',
              label: 'TextField',
              icon: 'form-textbox',
            },
            {
              value: 'dash',
              label: 'Custom App',
              icon: 'application-edit-outline',
            },
          ]}
        />
        {screen === 'counter' && (
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Clicks"
              onChangeText={textValue => {
                if (textValue && !isNaN(parseInt(textValue, 10))) {
                  setClicks(parseInt(textValue, 10));
                } else if (textValue === '') {
                  setClicks(0);
                }
              }}
              value={clicks?.toString()}
              keyboardType="numeric"
            />
          </View>
        )}
        {screen !== 'counter' && (
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Text"
              value={text}
              onChangeText={setText}
              right={
                <TextInput.Icon
                  icon="close-circle-outline"
                  onPress={() => setText('')}
                />
              }
            />
          </View>
        )}
        <View style={styles.flutterContainer}>
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
        <View style={styles.flutterContainer}>
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
    </View>
  );
}

const App: React.FC = () => {
  return <HomeScreen />;
};

export default App;
