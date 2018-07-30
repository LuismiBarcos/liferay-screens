//
//  UserPortraitView.swift
//  LiferayScreensReactNative
//
//  Created by Luis Miguel Barco on 27/07/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import LiferayScreens

class UserPortraitScreenletView: RCTView, UserPortraitScreenletDelegate {
  // Variables
  var screenlet: UserPortraitScreenlet!
  private var userId: NSNumber = 0
  var UserId: NSNumber {
    get{
      return userId
    }
    set {
      userId = newValue
      self.screenlet.load(userId: userId.int64Value)
    }
  }
  
  // Events
  var onUserPortraitLoaded: RCTBubblingEventBlock?
  var onUserPortraitError: RCTBubblingEventBlock?
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    self.screenlet = UserPortraitScreenlet(frame: frame, themeName: "default")
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
  
  // MARK: UserPortraitScreenletDelegate methods
  
  func screenlet(_ screenlet: UserPortraitScreenlet, onUserPortraitResponseImage image: UIImage) -> UIImage {
    let event: [String: Any] = [
      "target": self.reactTag,
      "image": NSStringFromCGSize(image.size)
    ]
    self.onUserPortraitLoaded?(event)
    return image;
  }
  
  func screenlet(_ screenlet: UserPortraitScreenlet, onUserPortraitError error: NSError) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "error": error.description
    ]
    self.onUserPortraitError?(event)
  }
  
  func screenlet(_ screenlet: UserPortraitScreenlet, onUserPortraitUploaded attributes: [String: AnyObject]) {
    // TODO: Send event to JS to notify that user portrait was uploaded
  }
  
  func screenlet(_ screenlet: UserPortraitScreenlet, onUserPortraitUploadError error: NSError) {
    // TODO: Send event to JS to notify abou the error in the upload process
  }
}