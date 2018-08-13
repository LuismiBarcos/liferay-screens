'use strict'
import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text, 
  View,
  Dimensions,
  NativeModules
} from 'react-native';

import DDLFormScreenlet from "./../LiferayScreens/DDL/Form/DDLFormScreenlet";

export default class  DDLForm extends Component {
    render(){
        return(
            <DDLFormScreenlet 
                style={styles.ddl}
                structureId={54371}
                recordSetId={54375}
            />
        );
    }
}

var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    ddl: {
      height: height,
      width: width
    }
});