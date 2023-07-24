/**
 * @format
 */

import React from 'react';
import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { PaperProvider } from 'react-native-paper';

export default function Main() {
  return (
    <PaperProvider>
      <React.Fragment>
        {Platform.OS === 'web' ? (
          <style type="text/css">{`
        @font-face {
          font-family: 'MaterialCommunityIcons';
          src: url(${require('react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf')}) format('truetype');
        }
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
