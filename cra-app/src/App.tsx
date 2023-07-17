import React from 'react'
import './App.css';
import { FlutterView } from 'flutter-module-rn'

function App() {
  return (
    <div className="App">
      <p>
        Flutter embedded using <code>div</code> element:
      </p>
      <div className="FlutterViewContainer">
        <FlutterView
          webConfig={{
            useIframe: false,
            assetBase: process.env.PUBLIC_URL + '/flutter/',
            src: process.env.PUBLIC_URL + '/flutter/main.dart.js',
          }}
        />
      </div>
      <p>
        Flutter embedded using <code>iframe</code>:
      </p>
      <div className="FlutterViewContainer">
        <FlutterView
          webConfig={{
            useIframe: false,
            assetBase: process.env.PUBLIC_URL + '/flutter/',
            src: process.env.PUBLIC_URL + '/flutter/main.dart.js',
          }}
        />
      </div>
    </div>
  );
}

export default App;
