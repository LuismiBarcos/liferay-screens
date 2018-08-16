//
//  CommentDisplayScreenletView.swift
//  LiferayScreensReactNative
//
//  Created by Luis Miguel Barco on 16/08/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import LiferayScreens

class CommentDisplayScreenletView: RCTView, CommentDisplayScreenletDelegate {
  // Variables
  var screenlet: CommentDisplayScreenlet!
  
  private var commentId: NSNumber = 0
  var CommentId: NSNumber {
    get{
      return commentId
    }
    set {
      commentId = newValue
      self.screenlet.commentId = commentId.int64Value
    }
  }
  
  // MARK: Events
  var onCommentLoaded: RCTBubblingEventBlock?
  var onLoadCommentError: RCTBubblingEventBlock?
  var onCommentDeleted: RCTBubblingEventBlock?
  var onDeleteComment: RCTBubblingEventBlock?
  var onCommentUpdated: RCTBubblingEventBlock?
  var onUpdateComment: RCTBubblingEventBlock?
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    self.screenlet = CommentDisplayScreenlet(frame: frame, themeName: "default")
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
  
  // MARK: CommentDisplayScreenletDelegate methods
  func screenlet(_ screenlet: CommentDisplayScreenlet, onCommentLoaded comment: Comment) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "comment": comment.attributes
    ]
    self.onCommentLoaded?(event)
  }
  
  func screenlet(_ screenlet: CommentDisplayScreenlet, onLoadCommentError error: NSError) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "error": error.description
    ]
    self.onLoadCommentError?(event)
  }
  
  func screenlet(_ screenlet: CommentDisplayScreenlet, onCommentDeleted comment: Comment) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "comment": comment.attributes
    ]
    self.onCommentLoaded?(event)
  }
  
  func screenlet(_ screenlet: CommentDisplayScreenlet,
                                onDeleteComment comment: Comment,
                                onError error: NSError) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "comment": comment.attributes,
      "error": error.description
    ]
    self.onLoadCommentError?(event)
  }
  
  func screenlet(_ screenlet: CommentDisplayScreenlet, onCommentUpdated comment: Comment) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "comment": comment.attributes
    ]
    self.onCommentUpdated?(event)
  }
  
  func screenlet(_ screenlet: CommentDisplayScreenlet,
                                onUpdateComment comment: Comment,
                                onError error: NSError) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "comment": comment.attributes,
      "error": error.description
    ]
    self.onUpdateComment?(event)
  }
}
