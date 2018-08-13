'use strict'
import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text, 
  View,
  NativeModules
} from 'react-native';
import RatingScreenlet from "./../LiferayScreens/Rating/RatingScreenlet";

export default class Rating extends Component {
    render() {
        return(
            <RatingScreenlet 
                style={styles.rating}
                classPK={74606}
                className={"com.liferay.document.library.kernel.model.DLFileEntry"}
            />
        );
    }
}

const styles = StyleSheet.create({
    rating: {
      height: 150,
      width: 150
    }
  });