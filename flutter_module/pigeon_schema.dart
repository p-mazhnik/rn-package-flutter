import 'package:pigeon/pigeon.dart';

@ConfigurePigeon(PigeonOptions(
  dartOut: 'lib/src/api.g.dart',
  kotlinOut:
      '../rn-flutter/android/src/main/java/com/reactlibrary/Messages.g.kt',
  kotlinOptions: KotlinOptions(package: 'com.reactlibrary'),
  swiftOut: '../rn-flutter/ios/Messages.g.swift',
  swiftOptions: SwiftOptions(),
  dartPackageName: 'flutter_module',
))
@FlutterApi()
abstract class FlutterCounterApi {
  void setText(String text);

  void setScreen(String screen);

  void setClicks(int value);
}

@HostApi()
abstract class HostCounterApi {
  void setText(String text);

  void setScreen(String screen);

  void setClicks(int value);
}
