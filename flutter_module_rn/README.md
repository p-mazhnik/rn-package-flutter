# flutter-module-rn

## Getting started

`$ npm install flutter-module-rn --save`  
or  
`$ yarn add flutter-module-rn`

## Installation

### Android

Add following repositories in your `android/build.gradle` file:  
```
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

## Usage
```javascript
import FlutterModuleRn from 'flutter_module_rn';

FlutterModuleRn.startFlutterActivity('', 0, (text: string) => {
  console.log(text);
});
```

## Development
We use [Flutter](https://flutter.dev/) for development.

To build artifacts you can run `yarn android:build` 
and `yarn ios:build`
