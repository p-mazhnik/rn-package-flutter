import React, { useEffect, useRef, useState, memo } from 'react'
import type { FlutterViewProps } from './types'
import { defaultWebConfig } from './types'

// The global _flutter namespace
declare var _flutter: any

// global promise is needed to avoid race conditions
// when component is mounted and immediately unmounted,
// e.g. in a React strict mode
let engineInitializerPromise: Promise<any> | null = null

export const FlutterViewCustomElement: React.FC<FlutterViewProps> = memo(({
  webConfig: {
    assetBase = defaultWebConfig.assetBase!,
    src = defaultWebConfig.src!,
  } = defaultWebConfig,
  appLoaded,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isMultiView, setIsMultiView] = useState(false)

  useEffect(() => {
    if (document.querySelectorAll('.flutter').length > 1) {
      // we can't render multiple Flutter instances in web: https://github.com/flutter/flutter/issues/118481
      setIsMultiView(true)
      return
    }
    let isRendered = true
    const initFlutterApp = async () => {
      if (!engineInitializerPromise) {
        console.log('create Flutter engine initializer promise...')
        engineInitializerPromise = new Promise<any>((resolve) => {
          console.log('setup Flutter engine initializer...')
          _flutter.loader.loadEntrypoint({
            entrypointUrl: src,
            onEntrypointLoaded: async (engineInitializer: any) => {
              resolve(engineInitializer)
            }
          })
        })
      }
      const engineInitializer = await engineInitializerPromise
      if (!isRendered) return

      console.log('initialize Flutter engine...')
      const appRunner = await engineInitializer?.initializeEngine({
        hostElement: ref.current,
        assetBase: assetBase,
      })
      if (!isRendered) return

      console.log('run Flutter engine...')
      await appRunner?.runApp()
    }
    initFlutterApp()

    const eventListener = (event: Event) => {
      let state = (event as CustomEvent).detail
      appLoaded?.(state)
    }

    ref.current?.addEventListener('flutter-initialized', eventListener, {
      once: true,
    })

    return () => {
      isRendered = false
      ref.current?.removeEventListener('flutter-initialized', eventListener)
    }
  }, [])
  return (
    <div
      ref={ref}
      className="flutter"
      style={{
        height: '100%',
        width: '100%',
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
})
