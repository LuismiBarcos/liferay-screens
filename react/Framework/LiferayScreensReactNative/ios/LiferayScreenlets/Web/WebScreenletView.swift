//
//  WebScreenletView.swift
//  LiferayScreensReactNative
//
//  Created by Luis Miguel Barco on 21/08/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import LiferayScreens

class WebScreenletView: RCTView, WebScreenletDelegate {
  // Variables
  var screenlet: WebScreenlet!
  
  // MARK: Events
  var onPageLoaded: RCTBubblingEventBlock?
  var onWebError: RCTBubblingEventBlock?
  var onNotify: RCTBubblingEventBlock?
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    self.screenlet = WebScreenlet(frame: frame, themeName: "default")
    self.screenlet.delegate = self
    self.screenlet.configuration = WebScreenletConfigurationBuilder(url: "https://www.andorratelecom.ad/")
                                  .set(webType: WebType.other)
                                  .load()
    self.screenlet.load()
    self.addSubview(self.screenlet)
    
    self.screenlet.translatesAutoresizingMaskIntoConstraints = false
    
    self.screenlet.topAnchor.constraint(equalTo: self.topAnchor).isActive = true
    self.screenlet.bottomAnchor.constraint(equalTo: self.bottomAnchor).isActive = true
    self.screenlet.rightAnchor.constraint(equalTo: self.rightAnchor).isActive = true
    self.screenlet.leftAnchor.constraint(equalTo: self.leftAnchor).isActive = true
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  // MARK: WebScreenletDelegate methods
  
  func onWebLoad(_ screenlet: WebScreenlet, url: String) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "url": url
    ]
    self.onPageLoaded?(event)
  }
  
  func screenlet(_ screenlet: WebScreenlet, onError error: NSError) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "error": error.description
    ]
    self.onWebError?(event)
  }
  
  func screenlet(_ screenlet: WebScreenlet,
                                onScriptMessageNamespace namespace: String,
                                onScriptMessage message: String) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "namespace": namespace,
      "message": message
    ]
    self.onNotify?(event)
  }
}
