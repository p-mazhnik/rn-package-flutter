import {
  findNodeHandle,
  requireNativeComponent,
  StyleProp,
  UIManager,
  StyleSheet,
  ViewStyle
} from 'react-native'
import React, { useEffect, useRef } from 'react'

interface FlutterNativeViewProps {
  style?: StyleProp<ViewStyle>;
}

const FlutterNativeView = requireNativeComponent<FlutterNativeViewProps>('RNFlutterViewManager')

const createFragment = (viewId: null | number) =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    'create',
    [viewId],
  )

export const FlutterView: React.FC = () => {
  const ref = useRef(null)

  useEffect(() => {
    const viewId = findNodeHandle(ref.current)
    createFragment(viewId)
  }, [])

  return (
    <FlutterNativeView
      style={styles.view}
      ref={ref}
    />
  )
}

const styles = StyleSheet.create({
  view: {
    height: '100%',
    width: '100%'
  }
})
