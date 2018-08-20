'use strict'
import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text, 
  View,
  NativeModules
} from 'react-native';
import WebContentListScreenlet from "./../LiferayScreens/WebContent/List/WebContentListScreenlet";

export default class WebContentList extends Component {
    render() {
        return(
            <WebContentListScreenlet
                {...this.props}
                style={styles.content}
                folderId={0}
            />
        );
    }
}

const styles = StyleSheet.create({
    content: {
      height: 350,
      width: 400
    }
  });