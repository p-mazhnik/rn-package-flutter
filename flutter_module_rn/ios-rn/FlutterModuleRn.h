// FlutterModuleRn.h

#import <React/RCTBridgeModule.h>
@import Flutter;

@interface FlutterModuleRn : NSObject <RCTBridgeModule>

+ (void)initWithFlutterEngine:(FlutterEngine * _Nonnull)flutterEngine;

@end
