/**
 * @format
 */

import React from 'react';
import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';
import MaterialCommunityIcons from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';

export default function Main() {
  const getWebFonts = fontFamily => {
    return `@font-face {
      src: url(${
        fontFamily === 'MaterialIcons' ? MaterialIcons : MaterialCommunityIcons
      });
      font-family: ${fontFamily};
    }`;
  };
  return (
    <PaperProvider theme={MD3LightTheme}>
      <React.Fragment>
        {Platform.OS === 'web' ? (
          <style type="text/css">{`
        ${getWebFonts('MaterialCommunityIcons')}
        ${getWebFonts('MaterialIcons')}
      `}</style>
        ) : null}
        <App />
      </React.Fragment>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);

if (Platform.OS === 'web') {
  AppRegistry.runApplication(appName, {
    // Mount the react-native app in the "root" div of index.html
    rootTag: document.getElementById('root'),
  });
}
