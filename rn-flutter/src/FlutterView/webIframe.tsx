import React, { useEffect, useRef } from 'react'
import type { FlutterViewProps } from './types'
import { defaultWebConfig } from './types'

export const FlutterViewIframe: React.FC<FlutterViewProps> = ({
  webConfig: {
    assetBase = defaultWebConfig.assetBase!,
  } = defaultWebConfig,
  appLoaded,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  useEffect(() => {
    const iframe = iframeRef.current
    const iframeWindow = iframe?.contentWindow ?? iframe?.contentDocument?.defaultView
    const eventListener = (event: Event) => {
      let state = (event as CustomEvent).detail
      appLoaded?.(state)
    }
    iframeWindow?.addEventListener('flutter-initialized', eventListener, {
      once: true,
    })
    return () => {
      iframeWindow?.removeEventListener('flutter-initialized', eventListener)
    }
  }, []);
  return (
    <iframe
      src={assetBase}
      ref={iframeRef}
      style={{
        height: '100%',
        width: '100%',
        border: 0,
      }}
      sandbox='allow-scripts allow-same-origin'
      referrerPolicy='no-referrer'
    />
  )
}
