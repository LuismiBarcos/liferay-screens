//
//  RatingScreenletView.swift
//  LiferayScreensReactNative
//
//  Created by Luis Miguel Barco on 13/08/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import LiferayScreens

class RatingScreenletView: RCTView, RatingScreenletDelegate {
  // Variables
  var screenlet: RatingScreenlet!
  private var className: String = ""
  var ClassName : String {
    get {
      return className
    }
    set {
      className = newValue
      screenlet.className = className
    }
  }
  
  private var classPK: NSNumber = 0
  var ClassPK: NSNumber {
    get{
      return classPK
    }
    set {
      classPK = newValue
      self.screenlet.classPK = classPK.int64Value
    }
  }
  
  // MARK: Events
  var onRatingRetrieve: RCTBubblingEventBlock?
  var onRatingDeleted: RCTBubblingEventBlock?
  var onRatingUpdated: RCTBubblingEventBlock?
  var onRatingError: RCTBubblingEventBlock?
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    self.screenlet = RatingScreenlet(frame: frame, themeName: "default")
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
  
  // MARK: RatingScreenletDelegate methods
  
  func screenlet(_ screenlet: RatingScreenlet, onRatingRetrieve rating: RatingEntry) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "rating": rating.attributes
    ]
    self.onRatingRetrieve?(event)
  }

  func screenlet(_ screenlet: RatingScreenlet, onRatingDeleted rating: RatingEntry) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "rating": rating.attributes
    ]
    self.onRatingDeleted?(event)
  }
  
  func screenlet(_ screenlet: RatingScreenlet, onRatingUpdated rating: RatingEntry) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "rating": rating.attributes
    ]
    self.onRatingUpdated?(event)
  }
  
  func screenlet(_ screenlet: RatingScreenlet, onRatingError error: NSError) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "error": error.description
    ]
    self.onRatingError?(event)
  }
}
