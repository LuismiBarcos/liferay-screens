'use strict'
import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text, 
  View,
  NativeModules
} from 'react-native';

import AssetListScreenlet from "./../LiferayScreens/Asset/List/AssetListScreenlet";

export default class AssetList extends Component {
    render() {
        return(
            <AssetListScreenlet 
                {...this.props}
                style={styles.assets}
                classNameId={20015}
            />
        );
    }
}

const styles = StyleSheet.create({
    assets: {
      height: 350,
      width: 400
    }
  });