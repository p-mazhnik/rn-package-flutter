export interface WebConfig {
  useIframe?: boolean;
  assetBase?: string;
  src?: string;
}

export interface FlutterViewProps {
  webConfig?: WebConfig;

  onClicksChange?: (clicks: number) => void;
  onScreenChange?: (screen: string) => void;
  onTextChange?: (text: string) => void;

  text: string;
  screen: string;
  clicks: number;
}

export const defaultWebConfig: WebConfig = {
  useIframe: true,
  assetBase: '',
  src: 'main.dart.js',
}
