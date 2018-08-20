//
//  AssetDisplayScreenletView.swift
//  LiferayScreensReactNative
//
//  Created by Luis Miguel Barco on 20/08/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import LiferayScreens

class AssetDisplayScreenletView: RCTView, AssetDisplayScreenletDelegate {
  // Variables
  var screenlet: AssetDisplayScreenlet!
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
  var onAssetResponse: RCTBubblingEventBlock?
  var onAssetError: RCTBubblingEventBlock?
  var onConfigureScreenlet: RCTBubblingEventBlock?
  var onAsset: RCTBubblingEventBlock?
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    self.screenlet = AssetDisplayScreenlet(frame: frame, themeName: "default")
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
  
  // MARK: AssetDisplayScreenletDelegate methods
  
  func screenlet(_ screenlet: AssetDisplayScreenlet, onAssetResponse asset: Asset) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "asset": asset.attributes
    ]
    self.onAssetResponse?(event)
  }
  
  func screenlet(_ screenlet: AssetDisplayScreenlet, onAssetError error: NSError) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "error": error.description
    ]
    self.onAssetError?(event)
  }
  
  func screenlet(_ screenlet: AssetDisplayScreenlet,
                                onConfigureScreenlet childScreenlet: BaseScreenlet?,
                                onAsset asset: Asset) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "childScreenlet": childScreenlet.debugDescription,
      "asset": asset.attributes
    ]
    self.onConfigureScreenlet?(event)
  }
  
  func screenlet(_ screenlet: AssetDisplayScreenlet, onAsset asset: Asset) -> UIView? {
    let event: [String: Any] = [
      "target": self.reactTag,
      "asset": asset.attributes
    ]
    self.onAsset?(event)
    return nil
  }
}
