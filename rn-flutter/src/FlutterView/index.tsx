import React from 'react'
import type { FlutterViewProps } from './types'
import { FlutterViewCustomElement } from './webCustom'
import { FlutterViewIframe } from './webIframe'
import { defaultWebConfig } from './types'


export const FlutterView: React.FC<FlutterViewProps> = ({webConfig = defaultWebConfig, ...props}) => {
  if (webConfig.useIframe ?? defaultWebConfig.useIframe) {
    return <FlutterViewIframe webConfig={webConfig} {...props} />;
  }
  return <FlutterViewCustomElement webConfig={webConfig} {...props} />;
}
