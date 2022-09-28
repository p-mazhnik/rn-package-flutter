import * as React from 'react'

interface FlutterModuleRn {
  startFlutterActivity: (arg1: string, arg2: number, callback: (text: string) => void) => void;
}

interface FlutterScreenProps {
  onCounterIncrement: (value: number) => void;
  onScreenClose: () => void;
}

declare const FlutterScreen: React.FC<FlutterScreenProps>

export default FlutterScreen
