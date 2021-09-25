#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
// @import Flutter;
// @import FlutterPluginRegistrant;

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate/*, FlutterAppLifeCycleProvider*/>

@property (nonatomic, strong) UIWindow *window;
// @property (nonatomic,strong) FlutterEngine *flutterEngine;

@end
