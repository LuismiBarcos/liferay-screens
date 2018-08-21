'use strict'
import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text, 
  View,
  Dimensions,
  NativeModules
} from 'react-native';

import WebScreenlet from "./../LiferayScreens/Web/WebScreenlet";

export default class Web extends Component {
    render() {
        return(
            <WebScreenlet 
                {...this.props}
                style={styles.web}

            />
        );
    }
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    web: {
      height: height,
      width: width
    }
});