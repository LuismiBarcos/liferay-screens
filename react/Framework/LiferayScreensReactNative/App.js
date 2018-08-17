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

import { StackNavigator } from 'react-navigation';

import Login from './Components/Login';
import HomeScreen from './HomeScreen';
import UserPortrait from './Components/UserPortrait';
import ImageGallery from './Components/ImageGallery'
import CommentList from './Components/CommentList';
import SignUp from './Components/SignUp';
import Rating from './Components/Rating';
import ForgotPassword from './Components/ForgotPassword';
import DDLForm from './Components/DDLForm';
import WebContentDisplay from './Components/WebContentDisplay';
import ImageDisplay from './Components/ImageDisplay';
import VideoDisplay from './Components/VideoDisplay';
import AudioDisplay from './Components/AudioDisplay';
import CommentDisplay from './Components/CommentDisplay';
import CommentAdd from './Components/CommentAdd'

const ScreenletsStack = StackNavigator({
  HomeScreen:{ screen: HomeScreen },
  UserPortrait:{ screen: UserPortrait },
  ImageGallery:{ screen: ImageGallery},
  CommentList:{ screen: CommentList },
  SignUp:{ screen: SignUp },
  Rating:{ screen: Rating },
  ForgotPassword: {screen: ForgotPassword },
  DDLForm: { screen: DDLForm },
  WebContentDisplay: { screen: WebContentDisplay },
  ImageDisplay: { screen: ImageDisplay },
  VideoDisplay: { screen: VideoDisplay },
  AudioDisplay: { screen: AudioDisplay },
  CommentDisplay: { screen: CommentDisplay },
  CommentAdd: { screen: CommentAdd }
});

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
      if(userId.user != 0) {
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
    if(this.state.logged) {
      return (
        <ScreenletsStack userId={5}/>
        // // <View style={styles.container}>
        // {/* <Text> Logged with id {this.state.userId}</Text> */}
        // {/* <Button 
        //   title="Go to screenlet"
        //   onPress={() => 
        //     this.props.navigation.navigate('UserPortrait')
        //   }
        // /> */}
        //   {/* <UserPortrait userId={this.state.userId}/> */}
        //   {/* <ImageGallery />  */}
        //   {/* <CommentList /> */}
        //   {/* <SignUp /> */}
        //   {/* <Rating /> */}
        //   {/* <ForgotPassword /> */}
        //   {/* <DDLForm /> */}
        //   {/* <WebContentDisplay /> */}
        //   {/* <ImageDisplay /> */}
        //   {/* <VideoDisplay /> */}
        //   {/* <AudioDisplay /> */}
        //   {/* <CommentDisplay /> */}
        //   {/* <CommentAdd /> */}
        // {/* </View> */}
      );
    } else {
      return (
        <View style={styles.container}>
          <Login onLoginSuccess={this._onLoginSuccess} />
        </View>
      );
    }
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
