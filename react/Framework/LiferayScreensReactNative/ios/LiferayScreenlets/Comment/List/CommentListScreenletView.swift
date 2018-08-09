//
//  CommentListScreenletView.swift
//  LiferayScreensReactNative
//
//  Created by Luis Miguel Barco on 08/08/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import LiferayScreens

class CommentListScreenletView: RCTView, CommentListScreenletDelegate {
  // Variables
  var screenlet: CommentListScreenlet!
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
  var onListResponseComments: RCTBubblingEventBlock?
  var onCommentListError: RCTBubblingEventBlock?
  var onSelectedComment: RCTBubblingEventBlock?
  var onDeletedComment: RCTBubblingEventBlock?
  var onCommentDelete: RCTBubblingEventBlock?
  var onUpdatedComment: RCTBubblingEventBlock?
  var onCommentUpdate: RCTBubblingEventBlock?
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    self.screenlet = CommentListScreenlet(frame: frame, themeName: "default")
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
  
  // MARK: CommentListScreenletDelegate methods
  
  func screenlet(_ screenlet: CommentListScreenlet, onListResponseComments comments: [Comment]) {
    let commentsAttributes = comments.map{
      $0.attributes
    }
    let event: [String: Any] = [
      "target": self.reactTag,
      "comments": commentsAttributes
    ]
    self.onListResponseComments?(event)
  }

  func screenlet(_ screenlet: CommentListScreenlet, onCommentListError error: NSError) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "error": error.description
    ]
    self.onCommentListError?(event)
  }
  
  func screenlet(_ screenlet: CommentListScreenlet, onSelectedComment comment: Comment) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "comment": comment.attributes
    ]
    self.onSelectedComment?(event)
  }
  
  func screenlet(_ screenlet: CommentListScreenlet, onDeletedComment comment: Comment) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "comment": comment.attributes
    ]
    self.onDeletedComment?(event)
  }
  
  func screenlet(_ screenlet: CommentListScreenlet,
                                onCommentDelete comment: Comment,
                                onError error: NSError) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "comment": comment.attributes,
      "error": error.description
    ]
    self.onCommentDelete?(event)
  }
  
  func screenlet(_ screenlet: CommentListScreenlet, onUpdatedComment comment: Comment) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "comment": comment.attributes
    ]
    self.onUpdatedComment?(event)
  }
  
  func screenlet(_ screenlet: CommentListScreenlet,
                                onCommentUpdate comment: Comment,
                                onError error: NSError) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "comment": comment.attributes,
      "error": error.description
    ]
    self.onCommentUpdate?(event)
  }
}
