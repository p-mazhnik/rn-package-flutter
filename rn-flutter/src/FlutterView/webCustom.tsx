import React, { useEffect, useRef, useState } from 'react'
import type { WebConfig } from './types'

// The global _flutter namespace
declare var _flutter: any

export const FlutterViewCustomElement: React.FC<WebConfig> = ({ assetBase = '', src = 'main.dart.js', }) => {
  const ref = useRef(null)
  const [isMultiView, setIsMultiView] = useState(false)

  useEffect(() => {
    if (document.querySelectorAll('.flutter').length > 1) {
      // we can't render multiple Flutter instances in web: https://github.com/flutter/flutter/issues/118481
      setIsMultiView(true)
      return
    }
    _flutter.loader.loadEntrypoint({
      entrypointUrl: src,
      onEntrypointLoaded: async (engineInitializer: any) => {
        let appRunner = await engineInitializer.initializeEngine({
          hostElement: ref.current,
          assetBase: assetBase,
        })
        await appRunner.runApp()
      }
    })
  }, [])
  return (
    <div
      ref={ref}
      className="flutter"
      style={{
        height: '100vh',
        width: '100vw',
      }}
    >
      {isMultiView &&
        <p>
          Multiple Flutter Instances are not supported.
          You can render Flutter in an iframe element instead,
          providing 'useIframe: true' to the 'webConfig' property.
        </p>
      }
    </div>
  )
}
