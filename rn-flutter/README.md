# flutter-module-rn

## Getting started

`$ npm install flutter-module-rn --save`  
or  
`$ yarn add flutter-module-rn`

## Installation

### Android

Add following repositories in your `android/build.gradle` file:  
```kotlin
repositories {
    maven {
        url "$rootDir/../node_modules/flutter-module-rn/build/host/outputs/repo"
    }
    maven {
        url "https://storage.googleapis.com/download.flutter.io"
    }
}
```

### iOS

Add following to your `Podfile`:

```ruby
require_relative '../node_modules/flutter-module-rn/ios-rn/pods'
...

target 'ReactNativeApp' do
    ...
    use_flutter_module_rn!()
    ...
end
```

Run `cd ios && pod install`

### Web
This is uncompiled package and may cause webpack build errors. 
To fix this your webpack needs to be configured to compile this module.
Please note that `html-loader` is required for this package.

To copy all the needed assets to host app add [Copy-Webpack-Plugin](https://www.npmjs.com/package/copy-webpack-plugin)
to your webpack configuration:
```js
plugins: [
  new CopyWebpackPlugin({
    patterns: [
      {
        from: 'node_modules/flutter-module-rn/build/web/assets',
        to: 'assets',
      },
      {
        from: 'node_modules/flutter-module-rn/build/web/icons',
        to: 'icons',
      },
    ],
  }),
]
```

## Usage
```javascript
import { FlutterScreen } from 'flutter-module-rn';

<Stack.Screen name="Flutter" component={FlutterScreen} />
```

## Development
We use [Flutter](https://flutter.dev/) for development.

To build artifacts you can run `yarn android:build`, 
`yarn ios:build` or `yarn web:build`
