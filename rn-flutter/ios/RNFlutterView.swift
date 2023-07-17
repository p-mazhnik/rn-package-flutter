import Foundation
import UIKit
import Flutter
import FlutterPluginRegistrant

// adapted from https://pspdfkit.com/blog/2017/native-view-controllers-and-react-native/
class RNFlutterView: UIView {
  private var viewController: FlutterViewController?
  private var embedded: Bool = false

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
    super.init(frame: frame)
  }

  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
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
