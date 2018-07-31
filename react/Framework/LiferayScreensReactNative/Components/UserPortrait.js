'use-strict'
import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text, 
  View,
  NativeModules
} from 'react-native';
import UserPortraitScreenlet from "./../LiferayScreens/UserPortraitScreenlet";

export default class UserPortrait extends Component {
    render() {
        return(
            <UserPortraitScreenlet 
                style={styles.portrait}
                onUserPortraitLoaded={this._userPortraitLoaded}
                onUserPortraitError={this._userPortraitError}
                userId={this.props.userId}
            />
        );
    }

    // UserPortrait events
  _userPortraitLoaded(image){
    console.log('Image loaded -> ', image)
  }

  _userPortraitError(error) {
    console.log('Error -> ', error);
  }
}

const styles = StyleSheet.create({
    portrait: {
      height: 150,
      width: 150
    }
  });