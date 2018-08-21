//
//  DDLListScreenletView.swift
//  LiferayScreensReactNative
//
//  Created by Luis Miguel Barco on 21/08/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import LiferayScreens

class DDLListScreenletView: RCTView, DDLListScreenletDelegate {
  // Variables
  var screenlet: DDLListScreenlet!
  
  private var labelFields: String = ""
  var LabelFields : String {
    get {
      return labelFields
    }
    set {
      labelFields = newValue
      screenlet.labelFields = labelFields
    }
  }
  
  private var recordSetId: NSNumber = 0
  var RecordSetId: NSNumber {
    get {
      return recordSetId
    }
    set {
      recordSetId = newValue
      self.screenlet.recordSetId = recordSetId.int64Value
    }
  }
  
  // MARK: Events
  var onDDLListResponseRecords: RCTBubblingEventBlock?
  var onDDLListError: RCTBubblingEventBlock?
  var onDDLSelectedRecord: RCTBubblingEventBlock?
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    self.screenlet = DDLListScreenlet(frame: frame, themeName: "default")
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
  
  // MARK: DDLListScreenletDelegate methods
  
  func screenlet(_ screenlet: DDLListScreenlet, onDDLListResponseRecords records: [DDLRecord]) {
    let recordsAttributes = records.map {
      $0.attributes
    }
    let event: [String: Any] = [
      "target": self.reactTag,
      "records": recordsAttributes
    ]
    self.onDDLListResponseRecords?(event)
  }
  
  func screenlet(_ screenlet: DDLListScreenlet, onDDLListError error: NSError) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "error": error.description
    ]
    self.onDDLListError?(event)
  }

  func screenlet(_ screenlet: DDLListScreenlet, onDDLSelectedRecord record: DDLRecord) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "record": record.attributes
    ]
    self.onDDLSelectedRecord?(event)
  }
}
