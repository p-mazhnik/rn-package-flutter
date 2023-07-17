import React, { useRef } from 'react'
import type { WebConfig } from './types'

export const FlutterViewIframe: React.FC<WebConfig> = ({assetBase = ''}) => {
  const iframeRef = useRef(null)
  return (
    <iframe
      src={assetBase}
      ref={iframeRef}
      style={{
        height: '100vh',
        width: '100vw',
        border: 0,
      }}
      sandbox='allow-scripts allow-same-origin'
      referrerPolicy='no-referrer'
    />
  )
}