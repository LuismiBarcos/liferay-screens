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
import UserPortraitScreenlet from './LiferayScreens/UserPortraitScreenlet';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logged: false
    };

    this._loginSucceded = this._loginSucceded.bind(this);
    this._loginFailed = this._loginFailed.bind(this);

    this._userPortraitError = this._userPortraitError.bind(this);
    this._userPortraitLoaded = this._userPortraitLoaded.bind(this);
  }
  
  render() {
    if(this.state.logged) {
      return (
        <View style={styles.container}>
          <UserPortraitScreenlet 
            style={styles.login}
            onUserPortraitLoaded={this._userPortraitLoaded}
            onUserPortraitError={this._userPortraitError}
            userId={this.state.userId}
          />
        </View>
      );
    } else {
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
  }

  // UserPortrait events
  _userPortraitLoaded(image){
    console.log('Image loaded -> ', image)
  }

  _userPortraitError(error) {
    console.log('Error -> ', error);
  }

  // Login Events
  _loginSucceded(attributes) {
    console.log('Login done!', attributes);
    this.setState({
			logged: true,
			userId: attributes.userId
		});
  }

  _loginFailed(error) {
    console.log('Login failed!');
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
