//
//  WebContentListScreenletView.swift
//  LiferayScreensReactNative
//
//  Created by Luis Miguel Barco on 20/08/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import LiferayScreens

class WebContentListScreenletView: RCTView, WebContentListScreenletDelegate {
  // Variables
  var screenlet: WebContentListScreenlet!
  
  private var folderId: NSNumber = 0
  var FolderId: NSNumber {
    get{
      return folderId
    }
    set {
      folderId = newValue
      self.screenlet.folderId = folderId.int64Value
    }
  }
  
  // MARK: Events
  var onWebContentListResponse: RCTBubblingEventBlock?
  var onWebContentListError: RCTBubblingEventBlock?
  var onWebContentSelected: RCTBubblingEventBlock?
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    self.screenlet = WebContentListScreenlet(frame: frame, themeName: "default")
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
  
  // MARK: WebContentListScreenletDelegate methods
  
  func screenlet(_ screenlet: WebContentListScreenlet, onWebContentListResponse contents: [WebContent]) {
    let htmls = contents.map{
      $0.html
    }
    let event: [String: Any] = [
      "target": self.reactTag,
      "contents": htmls
    ]
    self.onWebContentListResponse?(event)
  }
  
  func screenlet(_ screenlet: WebContentListScreenlet, onWebContentListError error: NSError) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "error": error.description
    ]
    self.onWebContentListError?(event)
  }
  
  func screenlet(_ screenlet: WebContentListScreenlet, onWebContentSelected content: WebContent) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "content": content.html ?? ""
    ]
    self.onWebContentSelected?(event)
  }
}
