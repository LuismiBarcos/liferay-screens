//
//  ForgotPasswordScreenletView.swift
//  LiferayScreensReactNative
//
//  Created by Luis Miguel Barco on 13/08/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import LiferayScreens

class ForgotPasswordScreenletView: RCTView, ForgotPasswordScreenletDelegate{
  // Variables
  var screenlet: ForgotPasswordScreenlet!
  
  // MARK: Events
  var onForgotPasswordSent: RCTBubblingEventBlock?
  var onForgotPasswordError: RCTBubblingEventBlock?
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    self.screenlet = ForgotPasswordScreenlet(frame: frame, themeName: "default")
    self.screenlet.delegate = self
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
  
  // MARK: ForgotPasswordScreenletDelegate methods
  
  func screenlet(_ screenlet: ForgotPasswordScreenlet, onForgotPasswordSent passwordSent: Bool) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "passwordSent": passwordSent
    ]
    self.onForgotPasswordSent?(event)
  }

  func screenlet(_ screenlet: ForgotPasswordScreenlet, onForgotPasswordError error: NSError) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "error": error.description
    ]
    self.onForgotPasswordError?(event)
  }
}
