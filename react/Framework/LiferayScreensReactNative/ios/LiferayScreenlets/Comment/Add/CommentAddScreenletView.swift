//
//  CommentAddScreenletView.swift
//  LiferayScreensReactNative
//
//  Created by Luis Miguel Barco on 16/08/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import LiferayScreens

class CommentAddScreenletView: RCTView, CommentAddScreenletDelegate {
  // Variables
  var screenlet: CommentAddScreenlet!
  
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
  var onCommentAdded: RCTBubblingEventBlock?
  var onAddCommentError: RCTBubblingEventBlock?
  var onCommentUpdated: RCTBubblingEventBlock?
  var onUpdateCommentError: RCTBubblingEventBlock?
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    self.screenlet = CommentAddScreenlet(frame: frame, themeName: "default")
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
  
  // MARK: CommentAddScreenletDelegate methods
  
  func screenlet(_ screenlet: CommentAddScreenlet, onCommentAdded comment: Comment) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "comment": comment.attributes
    ]
    self.onCommentAdded?(event)
  }
  
  func screenlet(_ screenlet: CommentAddScreenlet, onAddCommentError error: NSError) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "error": error.description
    ]
    self.onAddCommentError?(event)
  }
  
  func screenlet(_ screenlet: CommentAddScreenlet, onCommentUpdated comment: Comment) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "comment": comment.attributes
    ]
    self.onCommentUpdated?(event)
  }

  func screenlet(_ screenlet: CommentAddScreenlet, onUpdateCommentError error: NSError) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "error": error.description
    ]
    self.onUpdateCommentError?(event)
  }
}
