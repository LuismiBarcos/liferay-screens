'use strict'
import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text, 
  View,
  NativeModules
} from 'react-native';
import ForgotPasswordScreenlet from "./../LiferayScreens/Auth/ForgotPassword/ForgotPasswordScreenlet";

export default class ForgotPassword extends Component {
    render(){
        return(
            <ForgotPasswordScreenlet 
                style={styles.forgot}
                anonymousApiUserName={"test@liferay.com"}
                anonymousApiPassword={"test11"}
            />
        );
    }
}

const styles = StyleSheet.create({
    forgot: {
      height: 300,
      width: 300
    }
});