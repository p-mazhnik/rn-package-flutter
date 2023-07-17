import React from 'react'
import type { FlutterViewProps, WebConfig } from './types'
import { FlutterViewCustomElement } from './webCustom'
import { FlutterViewIframe } from './webIframe'

const defaultWebConfig: WebConfig = {
  useIframe: true,
}

export const FlutterView: React.FC<FlutterViewProps> = ({webConfig = defaultWebConfig}) => {
  if (webConfig.useIframe ?? defaultWebConfig.useIframe) {
    return <FlutterViewIframe {...webConfig} />;
  }
  return <FlutterViewCustomElement {...webConfig} />;
}
