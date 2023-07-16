import React, { useRef } from 'react'

const FlutterScreen = () => {
  const iframeRef = useRef(null)
  return (
    <iframe
      src="/flutter"
      ref={iframeRef}
      style={{
        height: '100vh',
        width: '100vw',
        top: 0,
        border: 0,
      }}
      sandbox='allow-scripts allow-same-origin'
      referrerPolicy='no-referrer'
    />
  )
}

export default FlutterScreen
