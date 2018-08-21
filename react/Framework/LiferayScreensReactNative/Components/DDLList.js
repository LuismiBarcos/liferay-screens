'use strict'
import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text, 
  View,
  NativeModules
} from 'react-native';

import DDLListScreenlet from "./../LiferayScreens/DDL/List/DDLListScreenlet";

export default class DDLList extends Component {
    render() {
        return(
            <DDLListScreenlet 
                {...this.props}
                style={styles.ddl}
                recordSetId={33280}
                labelFields={"description"}
            />
        );
    }
}

const styles = StyleSheet.create({
    ddl: {
      height: 350,
      width: 400
    }
});