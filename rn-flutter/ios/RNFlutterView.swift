import Foundation
import UIKit
import Flutter
import FlutterPluginRegistrant

// adapted from https://pspdfkit.com/blog/2017/native-view-controllers-and-react-native/
class RNFlutterView: UIView, HostCounterApi {
  private var viewController: FlutterViewController?
  private let flutterCounterApi: FlutterCounterApi
  private var embedded: Bool = false

  @objc var onClicksChange: RCTDirectEventBlock?
  @objc var onTextChange: RCTDirectEventBlock?
  @objc var onScreenChange: RCTDirectEventBlock?

  @objc var clicks: NSNumber? {
    didSet {
      if let c = clicks {
        flutterCounterApi.setClicks(value: c.int64Value) {}
      }
    }
  }
  @objc var text: String? {
    didSet {
      if let t = text {
        flutterCounterApi.setText(text: t) {}
      }
    }
  }
  @objc var screen: String? {
    didSet {
      if let s = screen {
        flutterCounterApi.setScreen(screen: s) {}
      }
    }
  }
  @objc var theme: String? {
    didSet {
      if let t = theme {
        flutterCounterApi.setTheme(theme: t) {}
      }
    }
  }

  override init(frame: CGRect) {
    let appDelegate: FlutterEngineProvider = UIApplication.shared.delegate as! FlutterEngineProvider
    let flutterEngine = appDelegate.engines.makeEngine(withEntrypoint: nil, libraryURI: nil)
    // Connects plugins with iOS platform code to this app.
    GeneratedPluginRegistrant.register(with: flutterEngine)
    viewController = FlutterViewController(
      engine: flutterEngine,
      nibName: nil,
      bundle: nil
    )
    flutterCounterApi = FlutterCounterApi.init(binaryMessenger: flutterEngine.binaryMessenger)
    super.init(frame: frame)
    HostCounterApiSetup.setUp(binaryMessenger: flutterEngine.binaryMessenger, api: self)
  }

  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  func setText(text: String) throws {
    onTextChange?(["text": text, "target": self.reactTag ?? NSNull()])
  }

  func setScreen(screen: String) throws {
    onScreenChange?(["screen": screen, "target": self.reactTag ?? NSNull()])
  }

  func setClicks(value: Int64) throws {
    onClicksChange?(["value": value, "target": self.reactTag ?? NSNull()])
  }

  override func layoutSubviews() {
    super.layoutSubviews()
    if !embedded {
      embed()
    } else {
      viewController?.view.frame = bounds
    }
  }

  override func removeFromSuperview() {
    viewController?.removeFromParent()
    viewController = nil
    embedded = false
    super.removeFromSuperview()
  }

  private func embed() {
    guard
      let parentVC = self.reactViewController() else {
      return
    }

    guard
      let vc = self.viewController else {
      return
    }

    parentVC.addChild(vc)
    addSubview(vc.view)
    vc.view.frame = bounds
    vc.didMove(toParent: parentVC)
    embedded = true
  }
}
