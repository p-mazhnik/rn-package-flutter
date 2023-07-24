// ignore_for_file: unnecessary_overrides

import 'package:flutter/foundation.dart';
import 'package:flutter_module/src/counter_state_manager.dart';
import 'package:js/js.dart';

import 'js_interop.dart';

@JSExport()
class JSDemoAppStateManager extends DemoAppStateManager {
  JSDemoAppStateManager({
    required super.screen,
    required super.counter,
    required super.text,
  });

  @override
  void onScreenChanged(Function(String) f) {
    super.onScreenChanged(f);
  }

  @override
  void onTextChanged(Function(String) f) {
    super.onTextChanged(f);
  }

  @override
  void onClicksChanged(Function(int) f) {
    super.onClicksChanged(f);
  }

  @override
  void setClicks(int value) {
    super.setClicks(value);
  }

  @override
  void setText(String text) {
    super.setText(text);
  }

  @override
  void setScreen(String screen) {
    super.setScreen(screen);
  }
}

void setupFlutterApi(DemoAppStateManager state) {
  assert(state is JSDemoAppStateManager);
  final export = createDartExport(state as JSDemoAppStateManager);
  broadcastAppEvent('flutter-initialized', export);
}

DemoAppStateManager getStateManager({
  required ValueNotifier<DemoScreen> screen,
  required ValueNotifier<int> counter,
  required ValueNotifier<String> text,
}) {
  return JSDemoAppStateManager(screen: screen, counter: counter, text: text);
}
