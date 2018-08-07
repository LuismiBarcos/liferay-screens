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

import Login from './Components/Login';
import UserPortrait from './Components/UserPortrait';
import ImageGallery from './Components/ImageGallery'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logged: false
    };

    this._onLoginSuccess = this._onLoginSuccess.bind(this);    
  }

  async componentWillMount(){
    try {
      var userId = await SessionContext.loadCredentials()
      
      if(userId) {
        this.setState({
          logged: true,
          userId: userId.user
        });
      }
    } catch(e) {
      this.setState({
        logged: false,
      });
    }
  }
  
  render() {
    // if(this.state.logged) {
      return (
        <View style={styles.container}>
        <Text> Logged </Text>
          {/* <UserPortrait userId={this.state.userId}/> */}
          <ImageGallery /> 
        </View>
      );
    // } else {
    //   return (
    //     <View style={styles.container}>
    //       <Login onLoginSuccess={this._onLoginSuccess} />
    //     </View>
    //   );
    // }
  }

  //Login success
  _onLoginSuccess(userId) {
    this.setState({
			logged: true,
			userId: userId
    });
  }
}

const SessionContext = NativeModules.SessionContextManager;

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});
