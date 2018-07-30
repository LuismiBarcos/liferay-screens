//
//  ImageGalleryScreenletView.swift
//  LiferayScreensReactNative
//
//  Created by Luis Miguel Barco on 30/07/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import LiferayScreens

class ImageGalleryScreenletView: RCTView, ImageGalleryScreenletDelegate {
  // Variables
  var screenlet: ImageGalleryScreenlet!
  private var folderId: NSNumber = 0  //For test 72155
  var FolderId: NSNumber {
    get{
      return folderId
    }
    set {
      folderId = newValue
      self.screenlet.folderId = folderId.int64Value
    }
  }
  
  private var repositoryId: NSNumber = 0  // For test 20143
  var RepositoryId: NSNumber {
    get{
      return repositoryId
    }
    set {
      repositoryId = newValue
      self.screenlet.repositoryId = repositoryId.int64Value
    }
  }
  
  // Events
  var onContentsReceived: RCTBubblingEventBlock?
  var onGalleryError: RCTBubblingEventBlock?
  var onItemSelected: RCTBubblingEventBlock?
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    self.screenlet = ImageGalleryScreenlet(frame: frame, themeName: "default")
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
  
  // MARK: ImageGalleryScreenletDelegate methods
  
  func screenlet(_ screenlet: ImageGalleryScreenlet, onImageEntriesResponse imageEntries: [ImageEntry]) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "images": imageEntries
    ]
    self.onContentsReceived?(event)
  }
  
  func screenlet(_ screenlet: ImageGalleryScreenlet, onImageEntriesError error: NSError) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "error": error.description
    ]
    self.onGalleryError?(event)
  }
  
  func screenlet(_ screenlet: ImageGalleryScreenlet, onImageEntrySelected imageEntry: ImageEntry) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "image": imageEntry.attributes
    ]
    self.onItemSelected?(event)
  }
  
  func screenlet(_ screenlet: ImageGalleryScreenlet, onImageEntryDeleted imageEntry: ImageEntry) {
    //TODO: send event to notify about the image deleted
  }
  
  func screenlet(_ screenlet: ImageGalleryScreenlet, onImageEntryDeleteError error: NSError) {
    //TODO: send event to notify about the error during image file deletion
  }
  
  func screenlet(_ screenlet: ImageGalleryScreenlet, onImageUploadStart imageEntryUpload: ImageEntryUpload) {
    //TODO: send event to notify that an image is prepared for upload
  }
  
  func screenlet(_ screenlet: ImageGalleryScreenlet,
                                onImageUploadProgress imageEntryUpload: ImageEntryUpload,
                                totalBytesSent: UInt64,
                                totalBytesToSend: UInt64) {
    //TODO: send event to notify that upload progress changes
  }
  
  func screenlet(_ screenlet: ImageGalleryScreenlet, onImageUploadError error: NSError) {
    //TODO: send event to notify about the error in he image upload progress
  }
  
  func screenlet(_ screenlet: ImageGalleryScreenlet, onImageUploaded image: ImageEntry) {
    //TODO: send event to notify that the image upload finishes
  }
  
  func screenlet(_ screenlet: ImageGalleryScreenlet, onImageUploadDetailViewCreated view: ImageUploadDetailViewBase) -> Bool {
    return true
  }
}
