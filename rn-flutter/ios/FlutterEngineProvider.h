#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <Flutter/Flutter.h>

#ifndef FlutterEngineProvider_h
#define FlutterEngineProvider_h

@protocol FlutterEngineProvider

@property(strong, nonatomic) FlutterEngineGroup* engines;

@end
#endif /* FlutterEngineProvider_h */
