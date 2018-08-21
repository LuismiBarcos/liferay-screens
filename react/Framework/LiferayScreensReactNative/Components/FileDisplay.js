'use strict'
import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Dimensions,
  Text, 
  View,
  NativeModules
} from 'react-native';
import FileDisplayScreenlet from "./../LiferayScreens/FileDisplay/FileDisplayScreenlet";

export default class FileDisplay extends Component {
    render(){
        return(
            <FileDisplayScreenlet 
                style={styles.file}
                className={"com.liferay.document.library.kernel.model.DLFileEntry"}
                classPK={66505}
            />
        );
    }
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    file: {
      height: height,
      width: width
    }
  });