#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
// #import "FlutterModuleRn.h"

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>

static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

// @interface AppDelegate ()
// @property (nonatomic, strong) FlutterPluginAppLifeCycleDelegate* lifeCycleDelegate;
// @end

@implementation AppDelegate

// - (instancetype)init {
//     if (self = [super init]) {
//         _lifeCycleDelegate = [[FlutterPluginAppLifeCycleDelegate alloc] init];
//     }
//     return self;
// }

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"ReactNativeApp"
                                            initialProperties:nil];
  // Init Flutter Engine
  // self.flutterEngine = [[FlutterEngine alloc] initWithName:@"io.flutter" project:nil];
  // [self.flutterEngine runWithEntrypoint:nil];
  // [GeneratedPluginRegistrant registerWithRegistry:self.flutterEngine];

  // Provide Flutter Engine to our module
  // [FlutterModuleRn initWithFlutterEngine:self.flutterEngine];

  if (@available(iOS 13.0, *)) {
      rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
      rootView.backgroundColor = [UIColor whiteColor];
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// Optional. The FlutterAppDelegate performs functions such as:
//   - Forwarding application callbacks such as openURL to plugins such as local_auth.
//   - Forwarding status bar taps (which can only be detected in the AppDelegate) to Flutter for scroll-to-top behavior.
//
//
// - (void)application:(UIApplication*)application
// didRegisterForRemoteNotificationsWithDeviceToken:(NSData*)deviceToken {
//     [_lifeCycleDelegate application:application
// didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
// }
//
// - (void)application:(UIApplication*)application
// didReceiveRemoteNotification:(NSDictionary*)userInfo
// fetchCompletionHandler:(void (^)(UIBackgroundFetchResult result))completionHandler {
//     [_lifeCycleDelegate application:application
//        didReceiveRemoteNotification:userInfo
//              fetchCompletionHandler:completionHandler];
// }
//
// - (BOOL)application:(UIApplication*)application
//             openURL:(NSURL*)url
//             options:(NSDictionary<UIApplicationOpenURLOptionsKey, id>*)options {
//     return [_lifeCycleDelegate application:application openURL:url options:options];
// }
//
// - (BOOL)application:(UIApplication*)application handleOpenURL:(NSURL*)url {
//     return [_lifeCycleDelegate application:application handleOpenURL:url];
// }
//
// - (BOOL)application:(UIApplication*)application
//             openURL:(NSURL*)url
//   sourceApplication:(NSString*)sourceApplication
//          annotation:(id)annotation {
//     return [_lifeCycleDelegate application:application
//                                    openURL:url
//                          sourceApplication:sourceApplication
//                                 annotation:annotation];
// }
//
// - (void)application:(UIApplication*)application
// performActionForShortcutItem:(UIApplicationShortcutItem*)shortcutItem
//   completionHandler:(void (^)(BOOL succeeded))completionHandler NS_AVAILABLE_IOS(9_0) {
//     [_lifeCycleDelegate application:application
//        performActionForShortcutItem:shortcutItem
//                   completionHandler:completionHandler];
// }
//
// - (void)application:(UIApplication*)application
// handleEventsForBackgroundURLSession:(nonnull NSString*)identifier
//   completionHandler:(nonnull void (^)(void))completionHandler {
//     [_lifeCycleDelegate application:application
// handleEventsForBackgroundURLSession:identifier
//                   completionHandler:completionHandler];
// }
//
// - (void)application:(UIApplication*)application
// performFetchWithCompletionHandler:(void (^)(UIBackgroundFetchResult result))completionHandler {
//     [_lifeCycleDelegate application:application performFetchWithCompletionHandler:completionHandler];
// }
//
// - (void)addApplicationLifeCycleDelegate:(NSObject<FlutterPlugin>*)delegate {
//     [_lifeCycleDelegate addDelegate:delegate];
// }

@end
