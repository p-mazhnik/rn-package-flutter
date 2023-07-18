export interface WebConfig {
  useIframe?: boolean;
  assetBase?: string;
  src?: string;
}

export interface FlutterViewProps {
  webConfig?: WebConfig;
  appLoaded?: (state: any) => void;
}

export const defaultWebConfig: WebConfig = {
  useIframe: true,
  assetBase: '',
  src: 'main.dart.js',
}
