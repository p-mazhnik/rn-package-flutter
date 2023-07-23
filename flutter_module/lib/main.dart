// ignore_for_file: avoid_web_libraries_in_flutter

import 'package:flutter/material.dart';

import 'pages/counter.dart';
import 'pages/dash.dart';
import 'pages/text.dart';

import 'src/api.g.dart';
import 'src/counter_state_manager.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final ValueNotifier<DemoScreen> _screen =
      ValueNotifier<DemoScreen>(DemoScreen.counter);
  final ValueNotifier<int> _counter = ValueNotifier<int>(0);
  final ValueNotifier<String> _text = ValueNotifier<String>('');

  late final DemoAppStateManager _state;
  late final HostCounterApi _hostApi;

  @override
  void initState() {
    super.initState();
    _state = DemoAppStateManager(
      screen: _screen,
      counter: _counter,
      text: _text,
    );
    _hostApi = HostCounterApi();
    FlutterCounterApi.setup(_state);
    _counter.addListener(() {
      _hostApi.setClicks(_counter.value);
    });
    _screen.addListener(() {
      _hostApi.setScreen(_screen.value.name);
    });
    _text.addListener(() {
      _hostApi.setText(_text.value);
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Element embedding',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: ValueListenableBuilder<DemoScreen>(
        valueListenable: _screen,
        builder: (context, value, child) => demoScreenRouter(value),
      ),
    );
  }

  Widget demoScreenRouter(DemoScreen which) {
    switch (which) {
      case DemoScreen.counter:
        return CounterDemo(counter: _counter);
      case DemoScreen.text:
        return TextFieldDemo(text: _text);
      case DemoScreen.dash:
        return DashDemo(text: _text);
    }
  }
}
