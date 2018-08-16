'use strict'
import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text, 
  View,
  NativeModules
} from 'react-native';
import ImageDisplayScreenlet from "./../LiferayScreens/FileDisplay/ImageDisplayScreenlet";

export default class ImageDisplay extends Component {
  render(){
    return(
      <ImageDisplayScreenlet 
        {...this.props}
        style={styles.image}
        className={"com.liferay.document.library.kernel.model.DLFileEntry"}
        classPK={54498}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 350,
    width: 500
  }
});