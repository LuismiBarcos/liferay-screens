'use strict'
import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text, 
  View,
  NativeModules
} from 'react-native';
import UserPortraitScreenlet from "./../LiferayScreens/UserPortrait/UserPortraitScreenlet";

export default class UserPortrait extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.getParam('userId', 0)
    };
  }
  
  render() {
    return(
        <UserPortraitScreenlet 
            style={styles.portrait}
            onUserPortraitLoaded={this._userPortraitLoaded}
            onUserPortraitError={this._userPortraitError}
            onUserPortraitUploaded={this._onUserPortraitUploaded}
            userId={this.state.userId}
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

  _onUserPortraitUploaded(attributes) {
      console.log('Portrait uploaded -> ', attributes);
  }
}

const styles = StyleSheet.create({
    portrait: {
      height: 150,
      width: 150
    }
  });