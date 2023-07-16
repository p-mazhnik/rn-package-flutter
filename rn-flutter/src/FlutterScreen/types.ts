export interface FlutterModuleRn {
  startFlutterActivity: (initialEvent: string, args: string, callback: (text: string) => void) => void;
  sendEvent: (event: string, args?: string) => void;
}

export interface FlutterScreenProps {
  onCounterIncrement: (value: number) => void;
  onScreenClose: () => void;
  initialCounterValue: number;
}
