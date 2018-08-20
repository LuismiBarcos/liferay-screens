//
//  AssetListScreenletView.swift
//  LiferayScreensReactNative
//
//  Created by Luis Miguel Barco on 20/08/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import LiferayScreens

class AssetListScreenletView: RCTView, AssetListScreenletDelegate {
  // Variables
  var screenlet: AssetListScreenlet!
  private var portletItemName: String = ""
  var PortletItemName : String {
    get {
      return portletItemName
    }
    set {
      portletItemName = newValue
      screenlet.portletItemName = portletItemName
    }
  }
  
  private var classNameId: NSNumber = 0
  var ClassNameId: NSNumber {
    get{
      return classNameId
    }
    set {
      classNameId = newValue
      self.screenlet.classNameId = classNameId.int64Value
    }
  }
  
  // MARK: Events
  var onAssetListResponse: RCTBubblingEventBlock?
  var onAssetListError: RCTBubblingEventBlock?
  var onAssetSelected: RCTBubblingEventBlock?
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    self.screenlet = AssetListScreenlet(frame: frame, themeName: "default")
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

  func screenlet(_ screenlet: AssetListScreenlet, onAssetListResponse assets: [Asset]) {
    let assetsAttributes = assets.map{
      $0.attributes
    }
    let event: [String: Any] = [
      "target": self.reactTag,
      "assets": assetsAttributes
    ]
    self.onAssetListResponse?(event)
  }
  
  func screenlet(_ screenlet: AssetListScreenlet, onAssetListError error: NSError) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "error": error.description
    ]
    self.onAssetListError?(event)
  }
  
  func screenlet(_ screenlet: AssetListScreenlet, onAssetSelected asset: Asset) {
    let event: [String: Any] = [
      "target": self.reactTag,
      "asset": asset.attributes
    ]
    self.onAssetSelected?(event);
  }
}

