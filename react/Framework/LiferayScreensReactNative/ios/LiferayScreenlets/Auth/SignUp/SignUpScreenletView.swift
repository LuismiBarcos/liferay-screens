//
//  SignUpScreenletView.swift
//  LiferayScreensReactNative
//
//  Created by Luis Miguel Barco on 09/08/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import LiferayScreens

class SignUpScreenletView: RCTView, SignUpScreenletDelegate {
  // Variables
  var screenlet: SignUpScreenlet!
  
  private var anonymousApiUserName: String = ""
  var AnonymousApiUserName: String {
    get{
      return anonymousApiUserName
    }
    set {
      anonymousApiUserName = newValue
      self.screenlet.anonymousApiUserName = anonymousApiUserName
    }
  }
  
  /// We have to rename anonymousApiPassword to ApiPassword because the first name
  /// create a conflict with ReactNative
  private var anonymousApiPassword: String = ""
  var AnonymousApiPassword: String {
    get{
      return anonymousApiPassword
    }
    set {
      anonymousApiPassword = newValue
      self.screenlet.anonymousApiPassword = anonymousApiPassword
    }
  }
  
  // MARK: events
  var onSignUpResponseUserAttributes: RCTBubblingEventBlock?
  var onSignUpError: RCTBubblingEventBlock?
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    self.screenlet = SignUpScreenlet(frame: frame, themeName: "default")
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
  
  // MARK: SignUpScreenletDelegate methods

  func screenlet(_ screenlet: SignUpScreenlet, onSignUpResponseUserAttributes attributes: [String: AnyObject]) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "user": attributes
    ]
    self.onSignUpResponseUserAttributes?(event)
  }
  
  func screenlet(_ screenlet: SignUpScreenlet, onSignUpError error: NSError){
    let event: [String: Any] = [
      "target": self.reactTag,
      "error": error.description
    ]
    self.onSignUpError?(event)
  }
}
