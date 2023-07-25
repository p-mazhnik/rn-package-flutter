import React, { useEffect, useRef } from 'react'
import type { FlutterViewProps } from './types'
import { defaultWebConfig } from './types'

export const FlutterViewIframe: React.FC<FlutterViewProps> = ({
  webConfig: {
    assetBase = defaultWebConfig.assetBase!,
  } = defaultWebConfig,
  // onClicksChange,
  // onScreenChange,
  // onTextChange,
  text,
  screen,
  clicks,
  theme,
}) => {
  const flutterState = useRef<any>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const onFlutterAppLoaded = (state: any) => {
    flutterState.current = state
    // listen to state changes
    // state.onClicksChanged(onClicksChange)
    // state.onTextChanged(onTextChange)
    // state.onScreenChanged(onScreenChange)
    // set initial values
    state.setText(text)
    state.setScreen(screen)
    state.setClicks(clicks)
    state.setTheme(theme)
  }

  useEffect(() => {
    const iframe = iframeRef.current
    const iframeWindow = iframe?.contentWindow ?? iframe?.contentDocument?.defaultView
    const eventListener = (event: Event) => {
      let state = (event as CustomEvent).detail
      onFlutterAppLoaded(state)
    }
    iframeWindow?.addEventListener('flutter-initialized', eventListener, {
      once: true,
    })
    return () => {
      iframeWindow?.removeEventListener('flutter-initialized', eventListener)
    }
  }, []);

  useEffect(() => {
    flutterState.current?.setText(text)
  }, [text]);
  useEffect(() => {
    flutterState.current?.setScreen(screen)
  }, [screen]);
  useEffect(() => {
    flutterState.current?.setTheme(theme)
  }, [theme]);
  useEffect(() => {
    flutterState.current?.setClicks(clicks)
  }, [clicks]);

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
