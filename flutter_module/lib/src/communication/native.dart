import 'package:flutter/foundation.dart';

import 'native_api.g.dart';
import '../counter_state_manager.dart';

void setupFlutterApi(DemoAppStateManager state) {
  final hostApi = HostCounterApi();
  FlutterCounterApi.setup(state);

  state.onClicksChanged(hostApi.setClicks);
  state.onTextChanged(hostApi.setText);
  state.onScreenChanged(hostApi.setScreen);
}

DemoAppStateManager getStateManager({
  required ValueNotifier<DemoScreen> screen,
  required ValueNotifier<int> counter,
  required ValueNotifier<String> text,
}) {
  return DemoAppStateManager(screen: screen, counter: counter, text: text);
}
