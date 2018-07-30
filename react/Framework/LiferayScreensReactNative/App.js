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
  View,
  NativeModules
} from 'react-native';
import LoginScreenlet from './LiferayScreens/LoginScreenlet';
import UserPortraitScreenlet from './LiferayScreens/UserPortraitScreenlet';
import ImageGalleryScreenlet from './LiferayScreens/ImageGalleryScreenlet';

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

  async componentWillMount(){
    try {
      var userId = await SessionContext.loadCredentials()
      if(userId) {
        this.setState({
          logged: true,
          userId: userId
        });
      }
    } catch(e) {
      console.error(e);
    }
  }
  
  render() {
    if(this.state.logged) {
      return (
        <View style={styles.container}>
          <UserPortraitScreenlet 
            style={styles.portrait}
            onUserPortraitLoaded={this._userPortraitLoaded}
            onUserPortraitError={this._userPortraitError}
            userId={this.state.userId}
          />
          <ImageGalleryScreenlet 
            style={styles.gallery}
            onContentsReceived={this._onContentsReceived}
            onGalleryError={this._onGalleryError}
            onItemSelected={this._onItemSelected}
            folderId={72155}
            repositoryId={20143}
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
              saveCredentials={true}
            />
        </View>
      );
    }
  }

  // ImageGallery event
  _onContentsReceived() {
    console.log('Content received');
  }

  _onGalleryError(error) {
    console.log('Error -> ',error);
  }

  _onItemSelected(attributes){
    console.log('Item selected -> ', attributes);
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

const SessionContext = NativeModules.SessionContextManager;

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  login: {
		height: 300,
    width: 300,
  },
  portrait: {
    height: 150,
    width: 150
  },
  gallery: {
    height: 400,
    width: 400
  }
});
