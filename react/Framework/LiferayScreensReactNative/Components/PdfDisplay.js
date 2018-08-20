'use strict'
import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Dimensions,
  Text, 
  View,
  NativeModules
} from 'react-native';
import PdfDisplayScreenlet from "./../LiferayScreens/FileDisplay/PdfDisplayScreenlet";

export default class PdfDisplay extends Component {
    render() {
        return(
            <PdfDisplayScreenlet 
                style={styles.pdf}
                className={"com.liferay.document.library.kernel.model.DLFileEntry"}
                classPK={38930}
            />
        );
    }
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    pdf: {
      height: height,
      width: width
    }
  });