import {
  findNodeHandle,
  requireNativeComponent,
  StyleProp,
  UIManager,
  StyleSheet,
  ViewStyle, Platform, NativeSyntheticEvent
} from 'react-native'
import React, { useEffect, useRef } from 'react'
import type { FlutterViewProps } from './types'

interface FlutterNativeViewProps {
  style?: StyleProp<ViewStyle>;
  text: string;
  screen: string;
  clicks: number;
  onClicksChange?: (event: NativeSyntheticEvent<{ value: number }>) => void;
  onScreenChange?: (event: NativeSyntheticEvent<{ screen: string }>) => void;
  onTextChange?: (event: NativeSyntheticEvent<{ text: string }>) => void;
}

const FlutterNativeView = requireNativeComponent<FlutterNativeViewProps>('RNFlutterView')

const createFragment = (viewId: null | number) =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    'create',
    [],
  )

export const FlutterView: React.FC<FlutterViewProps> = ({
  onClicksChange,
  onScreenChange,
  onTextChange,
  text,
  screen,
  clicks,
}) => {
  const ref = useRef(null)

  useEffect(() => {
    const viewId = findNodeHandle(ref.current)
    if (Platform.OS === 'android') {
      createFragment(viewId)
    }
  }, [])

  return (
    <FlutterNativeView
      style={styles.view}
      ref={ref}
      clicks={clicks}
      text={text}
      screen={screen}
      onClicksChange={(event) => {
        onClicksChange?.(event.nativeEvent.value)
      }}
      onTextChange={(event) => {
        onTextChange?.(event.nativeEvent.text)
      }}
      onScreenChange={(event) => {
        onScreenChange?.(event.nativeEvent.screen)
      }}
    />
  )
}

const styles = StyleSheet.create({
  view: {
    height: '100%',
    width: '100%'
  }
})
