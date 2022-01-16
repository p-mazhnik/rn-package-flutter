import React, { useEffect, useRef } from 'react'
import flutterWebHtml from '../../build/web/index.html';

const FlutterScreen = () => {
  const iframeRef = useRef(null);
  useEffect(() => {
    const iframe = iframeRef.current;
    const document = iframe.contentDocument;
    document.open();
    document.write(flutterWebHtml);
    document.close();
    iframe.setAttribute('referrerpolicy', 'no-referrer')
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin')
  }, [])

  return <iframe ref={iframeRef} style={{
    height: '100vh',
    width: '100vw',
    top: 0,
    border: 0,
  }} />
}

export default FlutterScreen;
