import React, { useRef } from 'react'

export const FlutterView: React.FC = () => {
  const iframeRef = useRef(null)
  return (
    <iframe
      src="/flutter"
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
