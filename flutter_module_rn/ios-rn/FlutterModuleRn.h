// FlutterModuleRn.h

#import <React/RCTBridgeModule.h>
@import Flutter;
@import FlutterPluginRegistrant;

@interface FlutterModuleRn : NSObject <RCTBridgeModule>

@property (nonatomic,strong) FlutterEngine *flutterEngine;
+ (void)initWithFlutterEngine:(FlutterEngine * _Nonnull)flutterEngine;

@end
