---
title: How to include Flutter module as a React Native package
description: Integrate Flutter module to React Native app as a npm package
published: true
date: 2021-09-27 19:31:37 UTC
tags: flutter,reactnative,ios,android
cover_image: https://cdn-images-1.medium.com/max/1024/1*DbzQqC3z1ZAU1eyAggv7Sg.png
---

![](https://cdn-images-1.medium.com/max/1024/1*DbzQqC3z1ZAU1eyAggv7Sg.png)

It's sometimes not practical to rewrite your entire application in Flutter all at once. For those situations, Flutter can be integrated into your existing application as a library or module. I've seen a lot of articles titled "Using React Native's Plugins in Flutter", but no one for the reversed case, where we need to use our Flutter's modules in React Native app. So I decided to write this article about including Flutter module as a React Native npm package.

Even if this article positioned as a guide for React Native developers, here also presented the best way (in my opinion) to use Flutter app as an iOS CocoaPods dependency.

In this article we will try to minimize the number of references on the Flutter + ReactNative package (required to install it) from the host React Native app.   
Let's try to implement a solution for this as simple as possible.

This article requires some basic knowledge of React Native and Flutter.  
**Full source code can be found** [**on GitHub**](https://github.com/p-mazhnik/rn-package-flutter)**.**

<hr />

### Prerequisites

- **Flutter** ≥ 2.5.1, **Node** ≥ 14;  
using these versions is recommended, but not required.
- AndroidStudio;  
XCode, CocoaPods ≥ **1.11.0** (this version is important)

### Getting Started

1. Initialize host RN (React Native) project:

```shell
$ npx react-native init ReactNativeApp
```

2. Create Flutter module:

```shell
$ flutter create -t module --org com.example flutter_module_rn
```

3. Initialize RN package in the newly created `flutter_module_rn` directory:

> Note that this command will overwrite `.gitignore` and `README.md` files

```shell
$ npx create-react-native-module flutter_module_rn --package-name flutter-module-rn
```

Let's make following modifications in `flutter_module_rn` directory:

- rename `ios` directory to `ios-rn`, `android` to `android-rn`.   
  We need this to separate our RN-wrapper files from Flutter code.
- add `react-native.config.js` file with the reference to new paths:

```js
module.exports = {
  dependency: {
    platforms: {
      ios: {
        project: './ios-rn/FlutterModuleRn.xcworkspace',
      },
      android: {
        sourceDir: './android-rn/',
      },
    },
  },
};
```

> I also made some changes to the `android-rn/build.gradle` file and `package.json` (update some versions) and rename `flutter_module_rn.podspec` file to `FlutterModuleRn.podspec`, to use more standard naming for iOS dependencies. These changes are not important.

4. Add this package to our host app's (ReactNativeApp) `package.json`:

```json
"flutter-module-rn": "file:../flutter_module_rn"
```

Note that we don't need to install it yet.

<hr />

Now we are ready to start implementing Flutter + RN integration through the native code.

### Android integration 🤖

#### Build local repository

To setup Android integration we will follow [Option A from Flutter official guide](https://flutter.dev/docs/development/add-to-app/android/project-setup#option-a---depend-on-the-android-archive-aar) 
and build our Flutter library as a generic local Maven repository composed of AARs and POMs artifacts. 
This way we can build the host app (`ReactNativeApp` in our case) without installing the Flutter SDK — this is important, because we don't want our package's RN users to install Flutter.   
Therefore, let's build AAR artifacts:

```shell
$ flutter build aar
```

We run this command in `flutter_module_rn` directory. This command creates a local Maven repository in `build/host/outputs/repo`.  
In the console we can see instructions to integrate, let's follow them with some modifications:
1. Open `flutter_module_rn/android-rn/build.gradle`
2. Ensure you have the repositories configured, otherwise add them:

```kotlin
repositories {
    maven {
        url "$rootDir/../build/host/outputs/repo"
    }
    maven {
        url "https://storage.googleapis.com/download.flutter.io"
    }
}
```

3. Add our Flutter module dependencies:

```kotlin
dependencies {
    debugImplementation 'com.example.flutter_module_rn:flutter_debug:1.0'
    profileImplementation 'com.example.flutter_module_rn:flutter_profile:1.0'
    releaseImplementation 'com.example.flutter_module_rn:flutter_release:1.0'
    
    //noinspection GradleDynamicVersion
    implementation 'com.facebook.react:react-native:+'  // From node_modules
}
```

4. Add the `profile` build type:

```kotlin
android {
  buildTypes {
    profile {
      initWith debug
    }
  }
}
```

5. Open `ReactNativeApp/android/build.gradle` and add repositories as in   
   step 2:

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

We need to duplicate repositories in host app because of the following issue:

[3rd party maven dependency in react-native npm module](https://stackoverflow.com/questions/65089494/3rd-party-maven-dependency-in-react-native-npm-module)

**This is the first place where we need to reference our RN package anywhere other than in `package.json`!** 
If anyone knows how to avoid this, please post your solution in comments. PRs to the repository are welcome as well 🙂

#### Adding a Flutter screen to an Android app

Following [the official Flutter tutorial](https://flutter.dev/docs/development/add-to-app/android/add-flutter-screen), 
let's add FlutterActivity to `flutter_module_rn/android-rn/src/main/AndroidManifest.xml`:

> It will be easier if you open `android-rn` directory in Android Studio

```xml
<!-- AndroidManifest.xml -->

<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.reactlibrary">
    <application>
        <activity 
            android:name="io.flutter.embedding.android.FlutterActivity"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
            android:hardwareAccelerated="true"
            android:windowSoftInputMode="adjustResize"
            />
    </application>
</manifest>
```

Package's Android Manifest will be merged with the host's Manifest during gradle build.   
Now let's replace `sampleMethod` in `flutter_module_rn/android-rn/src/main/java/com/reactlibrary/FlutterModuleRnModule.java` with the `startFlutterActivity` function:

```java
@ReactMethod
public void startFlutterActivity(String stringArgument, int numberArgument, Callback callback) {
    Activity currentActivity = reactContext.getCurrentActivity();
    // we can pass arguments to the Intent
    currentActivity.startActivity(
            FlutterActivity.createDefaultIntent(currentActivity)
    );
    callback.invoke("Received numberArgument: " + numberArgument + " stringArgument: " + stringArgument);
}
```

This function does exactly what its name says — starts FlutterActivity.

Finally, we can make changes to the host app, ReactNativeApp:

```js
import FlutterModuleRn from 'flutter-module-rn';

const startFlutterScreen = () => {
  // call native function
  FlutterModuleRn.startFlutterActivity('', 0, (text: string) => {
    console.log(text);
  });
};

...

<Button title={'Start Flutter Screen'} onPress={startFlutterScreen} />
```

Now we can run `yarn && yarn android` in `ReactNativeApp`.   
If you did everything right then you should see that Flutter screen is opened successfully 🎉

> I was need to resolve Java OutOfMemory Error. To fix this, change memory settings — uncomment line 13 in `ReactNativeApp/android/gradle.properties`:  
> `org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8`

<hr/>

In this article we consider Android integration using FlutterActivity. In Android we can integrate Flutter module using Fragments as well, but this will require some extra steps. You can check out the following articles as a start point:

- [Adding a Flutter Fragment to an Android app](https://flutter.dev/docs/development/add-to-app/android/add-flutter-fragment)
- [Rendering Native Android Fragments in React Native](https://stefan-majiros.com/blog/native-android-fragments-in-react-native/)

<hr/>

### iOS integration 📱

According to [the official Flutter tutorial](https://flutter.dev/docs/development/add-to-app/ios/project-setup#option-a---embed-with-cocoapods-and-the-flutter-sdk), there are only two ways to embed Flutter in your existing application:

1. Use the CocoaPods dependency manager and installed Flutter SDK. (They marked this way as _Recommended_)
2. Create frameworks for the Flutter engine, your compiled Dart code, and all Flutter plugins. Manually embed the frameworks, and update your existing application's build settings in Xcode.

We don't want our React Native developers to install Flutter SDK in order to use the package, thus let's take a look at the second option. I was immediately confused by the phrase 
"**Manually** embed the frameworks", because each Flutter dependency with the iOS platform code will produce its own framework:

```
Flutter/
    ├── Debug/
    │ ├── Flutter.xcframework
    │ ├── App.xcframework
    │ ├── FlutterPluginRegistrant.xcframework (only if you have plugins with iOS platform code)
    │ └── example_plugin.xcframework (each plugin is a separate framework)
```

It means that we will need to manually add frameworks to our host React Native app each time we add new Flutter dependency with the iOS code to the package. This will be very inconvenient for users of our package.

In addition, Flutter has an important warning, saying that plugins might produce **static or dynamic frameworks**. Static frameworks should be linked on, but never embedded:  
"If you embed a static framework into your application, your application is not publishable to the App Store and fails with a **Found an unexpected Mach-O header code** archive error".  
This means that for each framework we will need to manually determine if the framework is static or not 👎

It takes a lot of actions, doesn't it? We definitely should find a way to fix this.

#### Build frameworks

1. As a first step, we are going to add Flutter dependencies in our package in order to test integration with different types of frameworks:

```shell
$ flutter pub add url_launcher
```

2. As a second step, let's build iOS frameworks:

```shell
$ flutter build ios-framework --cocoapods
```

As a result, **static** `FlutterPluginRegistrant` framework will be added, and `url_launcher` package will produce **dynamic** `url_launcher` framework. 
We have different frameworks for Debug and Release configurations as well, and we can't use Release frameworks for the Debug configuration and vice versa.   
Therefore, we need to find a way to automatically link frameworks, depending on the configuration.

#### Achieve automatic embedding

React Native use CocoaPods to install iOS dependencies, and it has a `[CP] Embed Pods Frameworks` build phase in XCode. 
CocoaPods can automatically determine if the framework is static or dynamic. Then let's use flutter module's iOS frameworks as an CocoaPods package.

1. In CocoaPods we can't define pod configuration ("Debug" or "Release") in `podspec` file 
([https://github.com/CocoaPods/CocoaPods/issues/2847](https://github.com/CocoaPods/CocoaPods/issues/2847) and [https://github.com/CocoaPods/CocoaPods/issues/6338](https://github.com/CocoaPods/CocoaPods/issues/6338)), 
so we will need to reference our CocoaPods packages directly in our host ReactNativeApp `Podfile`.
To simplify this reference, we can create `ruby` function in `flutter_module_rn/ios-rn/pods.rb`:

```ruby
require 'json'

def use_flutter_module_rn! (options={})
  package = JSON.parse(File.read(File.join(__dir__, "../package.json")))
  packageName = package['name']
  prefix = options[:path] ||= "../node_modules/#{packageName}"

  pod 'Flutter', :podspec => "#{prefix}/build/ios/framework/Release/Flutter.podspec"
  pod 'FlutterModuleFrameworks-Debug',
    :configuration => 'Debug',
    :podspec => "#{prefix}/ios-rn/Podspecs/FlutterModuleRn-Debug.podspec"
  pod 'FlutterModuleFrameworks-Release',
    :configuration => 'Release',
    :podspec => "#{prefix}/ios-rn/Podspecs/FlutterModuleRn-Release.podspec"
end
```

And we should call this function in our React Native app:

```ruby
require_relative '../node_modules/flutter-module-rn/ios-rn/pods'
...
use_flutter_module_rn!()
```

**This is the second place where we need to reference our RN package in the source code.** Again, if anyone knows how to avoid this, please post your solution in comments.

2. Now we need to define podspecs for each configuration:

```ruby
require 'json'

package = JSON.parse(File.read(File.join(__dir__, '../../package.json')))

Pod::Spec.new do |s|
  s.name = "FlutterModuleFrameworks-Debug"
  s.summary = 'FlutterModuleFrameworks'
  s.description = package['description']
  s.license = package['license']
  s.homepage = package['homepage']
  
  s.version = package['version']
  s.source = { :http => "file:///#{__dir__}/../../build/ios/framework/Debug.zip"}
# You can reference sources as a git repository instead:
# s.source = { :git => "https://github.com/p-mazhnik/rn-package-flutter.git", :tag => 'some tag' } 
  s.authors      = { package['author']['name'] => package['author']['url'] }
  
  s.preserve_paths = "**/*.xcframework"
  s.pod_target_xcconfig = { 'DEFINES_MODULE' => 'YES' } 
  s.platforms    = { :ios => "11.0" }
  s.swift_version = '5.0'
  s.source_files = "**/*.{swift,h,m}"
  s.vendored_frameworks = '**/*.xcframework'
  s.xcconfig = { 'FRAMEWORK_SEARCH_PATHS' => "'${PODS_ROOT}/FlutterModuleFrameworks-Debug'"}
  s.requires_arc = true
end
```

> Here we're facing with [CocoaPods limitation](https://github.com/CocoaPods/cocoapods-packager/issues/216) — we can't define local directory in the 
> `source` property. But usually you will reference remote git repository instead of local directory.  
> Workaround for local directories: we can reference `zip` archives, then we will need to add our flutter build artifacts to zip archives:  
> `$ cd ./build/ios/framework && zip -r Debug.zip Debug && zip -r Release.zip Release && find . -name "*.xcframework" -type d -exec rm -rf {} \;`  
> This script will zip and remove Debug and Release directories (tested on MacOS).

The similar code will be for the "Release" configuration.  
Moreover, we need to specify our dependencies in `FlutterModuleRn.podspec` in order to be able to use dependencies in module iOS code:

```ruby
s.dependency "Flutter"
s.dependency "FlutterModuleFrameworks-Debug"
s.dependency "FlutterModuleFrameworks-Release"
```

With this setup our frameworks will be embedded to the host app automatically by CocoaPods.

#### Adding a Flutter screen to an iOS app

At this step we can start writing iOS code.

> Before moving on: it is better to read the documentation on [the Flutter integration guide for iOS](https://flutter.dev/docs/development/add-to-app/ios/add-flutter-screen) first.

We are going to modify `flutter_module_rn/ios-rn/FlutterModuleRn.{h,m}` files:

{% gist https://gist.github.com/p-mazhnik/547e4779a48e979fd58e0785abfe20d7 %}

This code was partially taken from Flutter integration guide. This code initializes `FlutterEngine` and starts `FlutterViewController`.

> The `FlutterEngine` serves as a host to the Dart VM and your Flutter runtime, and the `FlutterViewController` attaches to a `FlutterEngine` to pass UIKit input events into Flutter and to display frames rendered by the `FlutterEngine`.  
> [Source](https://flutter.dev/docs/development/add-to-app/ios/add-flutter-screen?tab=engine-objective-c-tab#start-a-flutterengine-and-flutterviewcontroller)

Note that we can provide `flutterEngine` from host app's `AppDelegate` file using `initWithFlutterEngine` function. 
We may need this if we want to share instance between different modules, but this is not required — we can initialize `flutterEngine` in `FlutterViewController` implicitly or initialize it in our module's `init` function

Now we can install dependencies:  
`cd ios && yarn upgrade flutter-module-rn && pod install`,   
and then open `ReactNativeApp/ios/ReactNativeApp.xcworkspace` file in XCode and run our app.

If you did everything right then you should see that Flutter screen is opened 🎉

![](https://cdn-images-1.medium.com/max/322/1*UZuaNDe_LeCetZmkZ4Ng1w.gif)<figcaption>iOS app</figcaption>

### Conclusion

In conclusion, I want to show resulting installation instructions for our Flutter + React Native package:

```shell
$ yarn add flutter-module-rn
```

#### Android

Add following repositories to your android/build.gradle file:

```kotlin
repositories {
    maven {
        url "$rootDir/../node_modules/<package-name>/build/host/outputs/repo"
    }
    maven {
        url "https://storage.googleapis.com/download.flutter.io"
    }
}
```

#### iOS

- Add following to your Podfile:

```ruby
require_relative '../node_modules/<package-name>/ios-rn/pods'
…
target 'ReactNativeApp' do
 …
 use_flutter_module_rn!()
 …
end
```

- Run `cd ios && pod install`

<hr />

Looks quite simple, what do you think? Our package's users don't need to install Flutter SDK, changes in our package do not require changes on their part. All complex integration processes are done implicitly using auto-linking features from both React Native and CocoaPods. Of course, due to several limitations, we cannot fully automate adding a package. Hopefully these issues will be resolved in the future.

**Like it if you find this article helpful**. It will help me write a solution for React Native Web as well.

**Full source code for this article can be found [on GitHub](https://github.com/p-mazhnik/rn-package-flutter).**

I appreciate feedback so please leave any suggestions or recommendations below.   
And if you face any troubles — let me know, I'll do my best to help you 🙂

**Thank you for reading!**

<hr />

This article was inspired by the work we do at **101 Edu**.   
101 Edu builds mobile-first teaching and assessment tools for college STEM courses. If you want to build cool stuff with us, check out some of our [job openings](https://angel.co/company/101/jobs)!

[Chem101 - Transform Your Chemistry Students with Active Learning](https://101edu.co/)
