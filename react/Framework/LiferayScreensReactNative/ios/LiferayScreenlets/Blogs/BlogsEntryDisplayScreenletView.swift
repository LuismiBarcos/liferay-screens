//
//  BlogsEntryDisplayScreenletView.swift
//  LiferayScreensReactNative
//
//  Created by Luis Miguel Barco on 21/08/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import LiferayScreens

class BlogsEntryDisplayScreenletView: RCTView, BlogsEntryDisplayScreenletDelegate {
  // Variables
  var screenlet: BlogsEntryDisplayScreenlet!
  
  private var assetEntryId: NSNumber = 0
  var AssetEntryId: NSNumber {
    get{
      return assetEntryId
    }
    set {
      assetEntryId = newValue
      self.screenlet.assetEntryId = assetEntryId.int64Value
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
  var onBlogEntryResponse: RCTBubblingEventBlock?
  var onBlogEntryError: RCTBubblingEventBlock?
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    self.screenlet = BlogsEntryDisplayScreenlet(frame: frame, themeName: "default")
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
  
  // MARK: BlogsEntryDisplayScreenletDelegate methods
  
  func screenlet(_ screenlet: BlogsEntryDisplayScreenlet, onBlogEntryResponse blogEntry: BlogsEntry) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "blogEntry": blogEntry.attributes
    ]
    self.onBlogEntryResponse?(event)
  }
  
  func screenlet(_ screenlet: BlogsEntryDisplayScreenlet, onBlogEntryError error: NSError) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "error": error.description
    ]
    self.onBlogEntryError?(event)
  }
}
