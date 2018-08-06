'use-strict'

import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text, 
  View,
  NativeModules
} from 'react-native';
import LoginScreenlet from './../LiferayScreens/Auth/Login/LoginScreenlet';
export default class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          logged: false
        };
    
        this._loginSucceded = this._loginSucceded.bind(this);
        this._loginFailed = this._loginFailed.bind(this);
    }

    render() {
        return(
            <LoginScreenlet style={styles.login}
              onLoginSuccess={this._loginSucceded}
              onLoginError={this._loginFailed}
            />
        );
    }

    // Login Events
  _loginSucceded(attributes) {
    console.log('Login done!', attributes);
    debugger;
    this.props.onLoginSuccess(attributes.userId)
  }

  _loginFailed(error) {
    console.log('Login failed!');
    debugger;
  }

  _onCredentialsSavedUserAttributes(attributes) {
    debugger;
  }

  _onCredentialsLoadedUserAttributes(attributes) {
    debugger;
  }
}

const styles = StyleSheet.create({
    login: {
        height: 300,
        width: 300,
    }
  });