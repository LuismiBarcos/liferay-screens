//
//  DDLFormScreenletView.swift
//  LiferayScreensReactNative
//
//  Created by Luis Miguel Barco on 13/08/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import LiferayScreens

class DDLFormScreenletView: RCTView, DDLFormScreenletDelegate {
  // Variables
  var screenlet: DDLFormScreenlet!
  private var structureId: NSNumber = 0
  var StructureId : NSNumber {
    get {
      return structureId
    }
    set {
      structureId = newValue
      screenlet.structureId = structureId.int64Value
    }
  }

  private var recordSetId: NSNumber = 0
  var RecordSetId: NSNumber {
    get{
      return recordSetId
    }
    set {
      recordSetId = newValue
      self.screenlet.recordSetId = recordSetId.int64Value
    }
  }
  
  // MARK: Events
  var onFormLoaded: RCTBubblingEventBlock?
  var onFormLoadError: RCTBubblingEventBlock?
  var onRecordLoaded: RCTBubblingEventBlock?
  var onRecordLoadError: RCTBubblingEventBlock?
  var onFormSubmitted: RCTBubblingEventBlock?
  var onFormSubmitError: RCTBubblingEventBlock?
  var onDocumentFieldUploadStarted: RCTBubblingEventBlock?
  var onUploadProgress: RCTBubblingEventBlock?
  var onUploadFinished: RCTBubblingEventBlock?
  var onUploadError: RCTBubblingEventBlock?
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    self.screenlet = DDLFormScreenlet(frame: frame, themeName: "default")
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
  
  // MARK: DDLFormScreenletDelegate methods
  
  func screenlet(_ screenlet: DDLFormScreenlet, onFormLoaded record: DDLRecord) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "record": record.fields.description
    ]
    self.onFormLoaded?(event)
  }
  
  func screenlet(_ screenlet: DDLFormScreenlet, onFormLoadError error: NSError) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "error": error.description
    ]
    self.onFormLoadError?(event)
  }

  func screenlet(_ screenlet: DDLFormScreenlet, onRecordLoaded record: DDLRecord) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "record": record.attributes
    ]
    self.onRecordLoaded?(event)
  }
  
  func screenlet(_ screenlet: DDLFormScreenlet, onRecordLoadError error: NSError) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "error": error.description
    ]
    self.onRecordLoadError?(event)
  }

  func screenlet(_ screenlet: DDLFormScreenlet, onFormSubmitted record: DDLRecord) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "record": record.attributes
    ]
    self.onFormSubmitted?(event)
  }

  func screenlet(_ screenlet: DDLFormScreenlet, onFormSubmitError error: NSError) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "error": error.description
    ]
    self.onFormSubmitError?(event)
  }
  
  func screenlet(_ screenlet: DDLFormScreenlet, onDocumentFieldUploadStarted field: DDMFieldDocument) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "field": field
    ]
    self.onDocumentFieldUploadStarted?(event)
  }

  func screenlet(_ screenlet: DDLFormScreenlet,
                                onDocumentField field: DDMFieldDocument,
                                uploadedBytes bytes: UInt64,
                                totalBytes total: UInt64) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "field": field,
      "bytes": bytes,
      "totalBytes": total
    ]
    self.onUploadProgress?(event)
  }
  
  func screenlet(_ screenlet: DDLFormScreenlet,
                                onDocumentField field: DDMFieldDocument,
                                uploadResult result: [String: Any]) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "field": field,
      "result": result
    ]
    self.onUploadFinished?(event)
  }
  
  func screenlet(_ screenlet: DDLFormScreenlet,
                                onDocumentField field: DDMFieldDocument,
                                uploadError error: NSError) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "error": error.description
    ]
    self.onUploadError?(event)
  }
}


