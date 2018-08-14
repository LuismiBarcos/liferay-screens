//
//  WebContentDisplayScreenletView.swift
//  LiferayScreensReactNative
//
//  Created by Luis Miguel Barco on 14/08/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import LiferayScreens

class WebContentDisplayScreenletView: RCTView, WebContentDisplayScreenletDelegate {
  // Variables
  var screenlet: WebContentDisplayScreenlet!
  private var articleId: String = ""
  var ArticleId : String {
    get {
      return articleId
    }
    set {
      articleId = newValue
      screenlet.articleId = articleId
    }
  }
  
  // MARK: Events
  var onWebContentResponse: RCTBubblingEventBlock?
  var onRecordContentResponse: RCTBubblingEventBlock?
  var onWebContentError: RCTBubblingEventBlock?
  var onUrlClicked: RCTBubblingEventBlock?
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    self.screenlet = WebContentDisplayScreenlet(frame: frame, themeName: "default")
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
  
  // MARK: WebContentDisplayScreenletDelegate methods
  
  func screenlet(_ screenlet: WebContentDisplayScreenlet, onWebContentResponse html: String) -> String? {
    let event: [String: Any] = [
      "target": self.reactTag,
      "html": html
    ]
    self.onWebContentResponse?(event)
    return html
  }
  
  func screenlet(_ screenlet: WebContentDisplayScreenlet, onRecordContentResponse record: DDLRecord) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "record": record.attributes
    ]
    self.onRecordContentResponse?(event)
  }
  
  func screenlet(_ screenlet: WebContentDisplayScreenlet, onWebContentError error: NSError) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "error": error.description
    ]
    self.onWebContentError?(event)
  }
  
  func screenlet(_ screenlet: WebContentDisplayScreenlet, onUrlClicked url: String) -> Bool {
    let event: [String: Any] = [
      "target": self.reactTag,
      "url": url
    ]
    self.onUrlClicked?(event)
    return false
  }
}
