//
//  ImageGalleryScreenletModule.m
//  LiferayScreensReactNative
//
//  Created by Luis Miguel Barco on 30/07/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTView.h>

@interface RCT_EXTERN_MODULE(ImageGalleryScreenletManager, RCTViewManager)

// Events
RCT_EXPORT_VIEW_PROPERTY(onContentsReceived, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onGalleryError, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onItemSelected, RCTBubblingEventBlock)

// Properties
RCT_EXPORT_VIEW_PROPERTY(folderId, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(repositoryId, NSNumber)

@end
