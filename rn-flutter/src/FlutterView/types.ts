export interface WebConfig {
  useIframe?: boolean;
  assetBase?: string;
  src?: string;
}

export interface FlutterViewProps {
  webConfig?: WebConfig;
}
