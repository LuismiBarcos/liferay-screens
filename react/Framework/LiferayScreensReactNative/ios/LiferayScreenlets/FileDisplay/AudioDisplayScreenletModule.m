//
//  AudioDisplayScreenletModule.m
//  LiferayScreensReactNative
//
//  Created by Luis Miguel Barco on 16/08/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTView.h>

@interface RCT_EXTERN_MODULE(AudioDisplayScreenletManager, RCTViewManager)

// Events
RCT_EXPORT_VIEW_PROPERTY(onFileAssetResponse, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onFileAssetError, RCTBubblingEventBlock)

// Properties
RCT_EXPORT_VIEW_PROPERTY(className, NSString)
RCT_EXPORT_VIEW_PROPERTY(classPK, NSNumber)

@end
