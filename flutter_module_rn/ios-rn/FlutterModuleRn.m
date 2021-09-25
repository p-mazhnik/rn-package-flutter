// FlutterModuleRn.m

@import Flutter;
@import UIKit;
#import "FlutterModuleRn.h"

static FlutterEngine *_flutterEngine = nil;

@implementation FlutterModuleRn

RCT_EXPORT_MODULE()

+ (void)initWithFlutterEngine:(FlutterEngine * _Nonnull)flutterEngine {
    _flutterEngine = flutterEngine;
}

RCT_EXPORT_METHOD(startFlutterActivity:(NSString *)stringArgument numberParameter:(nonnull NSNumber *)numberArgument callback:(RCTResponseSenderBlock)callback)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        // init FlutterViewController with engine provided by host app
        FlutterViewController *flutterViewController;
         if (_flutterEngine == nil) {
            // It is not recommended, but we can create a FlutterViewController with an implicit FlutterEngine
            // https://flutter.dev/docs/development/add-to-app/ios/add-flutter-screen?tab=engine-objective-c-tab#alternatively---create-a-flutterviewcontroller-with-an-implicit-flutterengine
            flutterViewController = [[FlutterViewController alloc] initWithProject:nil nibName:nil bundle:nil];
         } else {
            flutterViewController = [[FlutterViewController alloc] initWithEngine:_flutterEngine nibName:nil bundle:nil];
         }
        // fix ui
        [flutterViewController setModalPresentationStyle:UIModalPresentationFullScreen];

        UIViewController *rootController = UIApplication.sharedApplication.delegate.window.rootViewController;
        [rootController presentViewController:flutterViewController animated:YES completion:nil];
        callback(@[[NSString stringWithFormat: @"numberArgument: %@ stringArgument: %@", numberArgument, stringArgument]]);
    });
}

@end
