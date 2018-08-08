//
//  SessionContextManager.swift
//  LiferayScreensReactNative
//
//  Created by Luis Miguel Barco on 30/07/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import LiferayScreens

@objc(SessionContextManager)
class SessionContextManager: NSObject, RCTBridgeModule {
  static func moduleName() -> String! {
    return "SessionContext"
  }
  
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  func loadCredentials(_ resolver: RCTPromiseResolveBlock, rejecter: RCTPromiseRejectBlock) {
    SessionContext.loadStoredCredentials()
//    resolver(SessionContext.currentContext?.user.userId)
    resolver(SessionContext.currentContext?.user)
  }
}
