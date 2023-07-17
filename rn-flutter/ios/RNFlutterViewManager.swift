import React

@objc(RNFlutterViewManager)
class RNFlutterViewManager: RCTViewManager {

  override func view() -> (RNFlutterView) {
    return RNFlutterView()
  }

  @objc override static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
