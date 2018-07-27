/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text, 
  View
} from 'react-native';
import LoginScreenlet from './LiferayScreens/LoginScreenlet';


export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LoginScreenlet style={styles.login}
            onLoginSuccess={this._loginSucceded}
            onLoginError={this._loginFailed}
            onCredentialsSavedUserAttributes={this._onCredentialsSavedUserAttributes}
            onCredentialsLoadedUserAttributes={this._onCredentialsLoadedUserAttributes}
          />
      </View>
    );
  }

  // Events
  _loginSucceded(attributes) {
    debugger;
  }

  _loginFailed(error) {
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  login: {
		height: 300,
    width: 300,
	}
});
