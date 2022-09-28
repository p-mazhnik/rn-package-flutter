import React, { useEffect, useRef } from 'react'

const FlutterScreen = () => {
  const iframeRef = useRef(null);
  useEffect(() => {
    const iframe = iframeRef.current;
    iframe.setAttribute('referrerpolicy', 'no-referrer')
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin')
  }, [])

  return <iframe src='/flutter' ref={iframeRef} style={{
    height: '100vh',
    width: '100vw',
    top: 0,
    border: 0,
  }} />
}

export default FlutterScreen;
