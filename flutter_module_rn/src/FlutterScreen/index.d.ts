import * as React from 'react'

interface FlutterModuleRn {
  startFlutterActivity: (initialEvent: string, args: string, callback: (text: string) => void) => void;
  sendEvent: (event: string, args?: string) => void;
}

interface FlutterScreenProps {
  onCounterIncrement: (value: number) => void;
  onScreenClose: () => void;
  initialCounterValue: number;
}

declare const FlutterScreen: React.FC<FlutterScreenProps>

export default FlutterScreen
